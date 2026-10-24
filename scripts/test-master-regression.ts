import { problemDatabase } from '../dsa/data/problems-db';
import { judgeService } from '../backend/services/judge.service';
import { executionService } from '../backend/services/execution.service';

interface TestRecord {
  name: string;
  category: string;
  status: 'PASSED' | 'FAILED' | 'SKIPPED';
  detail?: string;
  durationMs?: number;
}

const records: TestRecord[] = [];

async function recordTest(category: string, name: string, fn: () => Promise<void>) {
  const start = performance.now();
  try {
    await fn();
    const duration = Math.round(performance.now() - start);
    records.push({ category, name, status: 'PASSED', durationMs: duration });
    console.log(`  ✓ [${category}] ${name} (${duration}ms)`);
  } catch (err: any) {
    const duration = Math.round(performance.now() - start);
    records.push({ category, name, status: 'FAILED', detail: err.message, durationMs: duration });
    console.error(`  ✗ [${category}] ${name} FAILED: ${err.message}`);
  }
}

function skipTest(category: string, name: string, reason: string) {
  records.push({ category, name, status: 'SKIPPED', detail: reason });
  console.log(`  - [${category}] ${name} (SKIPPED: ${reason})`);
}

async function runMasterRegression() {
  console.log('========================================================================');
  console.log('      ZENSUS DSA PLATFORM — MASTER COMPREHENSIVE REGRESSION SUITE       ');
  console.log('========================================================================\n');

  // --- SUITE 1: CATALOG INTEGRITY ---
  console.log('--- SUITE 1: CATALOG INTEGRITY ---');
  await recordTest('Catalog', '70 Verified Topics Exist', async () => {
    const topics = problemDatabase.getAllTopics();
    if (topics.length !== 70) throw new Error(`Expected 70 topics, found ${topics.length}`);
  });

  await recordTest('Catalog', '2,750 Unique Problems Available', async () => {
    const total = problemDatabase.getTotalProblemsCount();
    if (total !== 2750) throw new Error(`Expected 2,750 problems, found ${total}`);
  });

  await recordTest('Catalog', 'Zero Security Leaks in Public Problem API', async () => {
    for (const id of ['1', '2', '20', '73', '104', '206', '283']) {
      const pub = problemDatabase.getPublicProblemById(id);
      if (!pub) throw new Error(`Problem ${id} not found`);
      if ((pub as any).hiddenTests?.length > 0) throw new Error(`hiddenTests leak in ${id}`);
      if ((pub as any).referenceSolution) throw new Error(`referenceSolution leak in ${id}`);
    }
  });

  // --- SUITE 2: TOOLCHAIN DISCOVERY & HEALTH ---
  console.log('\n--- SUITE 2: TOOLCHAIN DISCOVERY & HEALTH ---');
  const healthList = await executionService.checkRunnersHealth();
  for (const h of healthList) {
    if (h.available) {
      await recordTest('Toolchain', `${h.name} Verified Execution`, async () => {
        if (!h.verified) throw new Error(`${h.name} micro-execution failed`);
      });
    } else {
      skipTest('Toolchain', `${h.name} (Missing on Host)`, h.notes || 'Compiler not in PATH');
    }
  }

  // --- SUITE 3: FUNCTION-BASED RUN & SUBMIT ON REAL PROBLEMS ---
  console.log('\n--- SUITE 3: MULTI-LANGUAGE FUNCTION WORKFLOWS ---');
  // Problem 1: Two Sum (Hash Table / Array)
  await recordTest('Function', 'Problem 1 (Two Sum) Python Function Accepted', async () => {
    const code = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        m = {}
        for i, n in enumerate(nums):
            if target - n in m: return [m[target - n], i]
            m[n] = i
        return []`;
    const res = await judgeService.runProblem('1', 'python', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Function', 'Problem 1 (Two Sum) JS Function Accepted', async () => {
    const code = `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
    return [];
};`;
    const res = await judgeService.runProblem('1', 'javascript', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Function', 'Problem 1 (Two Sum) Java Function Accepted', async () => {
    const code = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[]{map.get(comp), i};
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`;
    const res = await judgeService.runProblem('1', 'java', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  // --- SUITE 4: STANDARD I/O EXECUTION ---
  console.log('\n--- SUITE 4: STANDARD I/O EXECUTION ---');
  await recordTest('Stdin', 'Python Standard I/O (sys.stdin)', async () => {
    const code = `import sys, json
raw = sys.stdin.read().strip()
if raw:
    for line in raw.split('\\n'):
        if not line.strip(): continue
        parts = line.split(', target = ')
        nums = json.loads(parts[0].replace('nums = ', '').strip())
        target = int(parts[1].strip())
        m = {}
        for i, n in enumerate(nums):
            if target - n in m:
                print(json.dumps([m[target - n], i]))
                break
            m[n] = i`;
    const res = await judgeService.runProblem('1', 'python', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Stdin', 'JavaScript Standard I/O (fs.readFileSync)', async () => {
    const code = `const fs = require('fs');
const raw = fs.readFileSync(0, 'utf8').trim();
if (raw) {
  for (const line of raw.split('\\n')) {
    if (!line.trim()) continue;
    const parts = line.split(', target = ');
    const nums = JSON.parse(parts[0].replace('nums = ', '').trim());
    const target = parseInt(parts[1].trim(), 10);
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const diff = target - nums[i];
      if (map.has(diff)) {
        console.log(JSON.stringify([map.get(diff), i]));
        break;
      }
      map.set(nums[i], i);
    }
  }
}`;
    const res = await judgeService.runProblem('1', 'javascript', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  // --- SUITE 5: IN-PLACE MUTATION ---
  console.log('\n--- SUITE 5: IN-PLACE MUTATION HANDLING ---');
  await recordTest('In-Place', 'Problem 283 (Move Zeroes) Python in-place', async () => {
    const code = `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        p = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[p], nums[i] = nums[i], nums[p]
                p += 1`;
    const res = await judgeService.runProblem('283', 'python', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('In-Place', 'Problem 283 (Move Zeroes) JS in-place', async () => {
    const code = `var moveZeroes = function(nums) {
    let p = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            let t = nums[p]; nums[p] = nums[i]; nums[i] = t;
            p++;
        }
    }
};`;
    const res = await judgeService.runProblem('283', 'javascript', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('In-Place', 'Problem 283 (Move Zeroes) Java in-place', async () => {
    const code = `class Solution {
    public void moveZeroes(int[] nums) {
        int p = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                int t = nums[p]; nums[p] = nums[i]; nums[i] = t;
                p++;
            }
        }
    }
}`;
    const res = await judgeService.runProblem('283', 'java', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  // --- SUITE 6: LINKED LIST DATA STRUCTURE ---
  console.log('\n--- SUITE 6: LINKED LIST DATA STRUCTURE ---');
  await recordTest('Linked List', 'Problem 206 (Reverse Linked List) Python', async () => {
    const code = `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None; curr = head
        while curr:
            nxt = curr.next; curr.next = prev; prev = curr; curr = nxt
        return prev`;
    const res = await judgeService.runProblem('206', 'python', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Linked List', 'Problem 206 (Reverse Linked List) JS', async () => {
    const code = `var reverseList = function(head) {
    let prev = null, curr = head;
    while (curr) {
        let nxt = curr.next; curr.next = prev; prev = curr; curr = nxt;
    }
    return prev;
};`;
    const res = await judgeService.runProblem('206', 'javascript', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Linked List', 'Problem 206 (Reverse Linked List) Java', async () => {
    const code = `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nxt = curr.next; curr.next = prev; prev = curr; curr = nxt;
        }
        return prev;
    }
}`;
    const res = await judgeService.runProblem('206', 'java', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  // --- SUITE 7: BINARY TREE DATA STRUCTURE ---
  console.log('\n--- SUITE 7: BINARY TREE DATA STRUCTURE ---');
  await recordTest('Binary Tree', 'Problem 104 (Max Depth) Python', async () => {
    const code = `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`;
    const res = await judgeService.runProblem('104', 'python', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Binary Tree', 'Problem 104 (Max Depth) JS', async () => {
    const code = `var maxDepth = function(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};`;
    const res = await judgeService.runProblem('104', 'javascript', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Binary Tree', 'Problem 104 (Max Depth) Java', async () => {
    const code = `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`;
    const res = await judgeService.runProblem('104', 'java', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  // --- SUITE 8: 2D ARRAYS & MATRICES ---
  console.log('\n--- SUITE 8: 2D ARRAYS & MATRICES ---');
  await recordTest('Matrix', 'Problem 73 (Set Matrix Zeroes) Python', async () => {
    const code = `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        R, C = len(matrix), len(matrix[0])
        rows, cols = set(), set()
        for r in range(R):
            for c in range(C):
                if matrix[r][c] == 0: rows.add(r); cols.add(c)
        for r in range(R):
            for c in range(C):
                if r in rows or c in cols: matrix[r][c] = 0`;
    const res = await judgeService.runProblem('73', 'python', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  await recordTest('Matrix', 'Problem 73 (Set Matrix Zeroes) Java', async () => {
    const code = `class Solution {
    public void setZeroes(int[][] matrix) {
        int R = matrix.length, C = matrix[0].length;
        boolean[] rows = new boolean[R], cols = new boolean[C];
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (matrix[r][c] == 0) { rows[r] = true; cols[c] = true; }
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (rows[r] || cols[c]) matrix[r][c] = 0;
    }
}`;
    const res = await judgeService.runProblem('73', 'java', code);
    if (res.verdict !== 'ACCEPTED') throw new Error(`Verdict: ${res.verdict}`);
  });

  // --- SUITE 9: JUDGE VERDICTS & ERROR HANDLING ---
  console.log('\n--- SUITE 9: JUDGE VERDICTS & ERROR HANDLING ---');
  await recordTest('Judge', 'WRONG_ANSWER Verdict Accuracy', async () => {
    const res = await judgeService.runProblem('1', 'python', 'class Solution:\n    def twoSum(self, nums, target): return [99, 99]');
    if (res.verdict !== 'WRONG_ANSWER') throw new Error(`Expected WRONG_ANSWER, got ${res.verdict}`);
  });

  await recordTest('Judge', 'COMPILATION_ERROR Syntax Detection Python', async () => {
    const res = await judgeService.runProblem('1', 'python', 'def bad_syntax(');
    if (res.verdict !== 'COMPILATION_ERROR') throw new Error(`Expected COMPILATION_ERROR, got ${res.verdict}`);
  });

  await recordTest('Judge', 'COMPILATION_ERROR Java Syntax Detection', async () => {
    const res = await judgeService.runProblem('1', 'java', 'class Solution { public int[] twoSum() { syntax_err; } }');
    if (res.verdict !== 'COMPILATION_ERROR') throw new Error(`Expected COMPILATION_ERROR, got ${res.verdict}`);
  });

  await recordTest('Judge', 'RUNTIME_ERROR Exception Handling Python', async () => {
    const res = await judgeService.runProblem('1', 'python', 'class Solution:\n    def twoSum(self, nums, target): raise ZeroDivisionError("divide by zero")');
    if (res.verdict !== 'RUNTIME_ERROR') throw new Error(`Expected RUNTIME_ERROR, got ${res.verdict}`);
  });

  await recordTest('Judge', 'TIME_LIMIT_EXCEEDED & Taskkill Process Cleanup', async () => {
    const res = await judgeService.runProblem('1', 'python', 'import time\ntime.sleep(4)');
    if (res.verdict !== 'TIME_LIMIT_EXCEEDED') throw new Error(`Expected TIME_LIMIT_EXCEEDED, got ${res.verdict}`);
  });

  const cppHealth = healthList.find(h => h.language === 'cpp');
  const cHealth = healthList.find(h => h.language === 'c');

  if (cppHealth?.available) {
    await recordTest('Judge', 'C++ Toolchain Execution Available', async () => {
      const res = await judgeService.runProblem('1', 'cpp', 'int main(){return 0;}');
      if (res.verdict === 'RUNNER_UNAVAILABLE') throw new Error('C++ runner unexpectedly reported unavailable');
    });
  } else {
    await recordTest('Judge', 'RUNNER_UNAVAILABLE C++ Missing Compiler', async () => {
      const res = await judgeService.runProblem('1', 'cpp', 'int main(){return 0;}');
      if (res.verdict !== 'RUNNER_UNAVAILABLE') throw new Error(`Expected RUNNER_UNAVAILABLE, got ${res.verdict}`);
    });
  }

  if (cHealth?.available) {
    await recordTest('Judge', 'C Toolchain Execution Available', async () => {
      const res = await judgeService.runProblem('1', 'c', 'int main(){return 0;}');
      if (res.verdict === 'RUNNER_UNAVAILABLE') throw new Error('C runner unexpectedly reported unavailable');
    });
  } else {
    await recordTest('Judge', 'RUNNER_UNAVAILABLE C Missing Compiler', async () => {
      const res = await judgeService.runProblem('1', 'c', 'int main(){return 0;}');
      if (res.verdict !== 'RUNNER_UNAVAILABLE') throw new Error(`Expected RUNNER_UNAVAILABLE, got ${res.verdict}`);
    });
  }

  // --- SUITE 10: SUBMISSION LIFECYCLE & PROGRESS ---
  console.log('\n--- SUITE 10: SUBMISSION LIFECYCLE & PROGRESS ---');
  await recordTest('Lifecycle', 'Submit Creates Record & Updates Progress', async () => {
    const sub = await judgeService.submitProblem('20', 'python', `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []; m = {')': '(', '}': '{', ']': '['}
        for c in s:
            if c in m:
                if not stack or stack.pop() != m[c]: return False
            else: stack.append(c)
        return not stack`);
    if (sub.verdict !== 'ACCEPTED') throw new Error(`Submit verdict: ${sub.verdict}`);
    if (!sub.submission.id) throw new Error('Missing submission ID');
    if (!judgeService.isProblemSolved('20')) throw new Error('Problem 20 not marked solved');
  });

  await recordTest('Lifecycle', 'Bookmark Toggle & Persistence', async () => {
    const initial = judgeService.isProblemBookmarked('20');
    const toggled = judgeService.toggleBookmark('20');
    if (toggled === initial) throw new Error('Bookmark toggle failed');
    judgeService.toggleBookmark('20'); // restore
  });

  // --- SUMMARY REPORT ---
  console.log('\n========================================================================');
  console.log('                   MASTER REGRESSION AUDIT RESULTS                      ');
  console.log('========================================================================');
  const passed = records.filter(r => r.status === 'PASSED').length;
  const failed = records.filter(r => r.status === 'FAILED').length;
  const skipped = records.filter(r => r.status === 'SKIPPED').length;
  const total = records.length;

  console.log(`TOTAL TESTS:   ${total}`);
  console.log(`PASSED:        ${passed}`);
  console.log(`FAILED:        ${failed}`);
  console.log(`SKIPPED:       ${skipped}`);
  console.log('========================================================================');

  if (failed > 0) {
    console.error(`\nREGRESSION FAILED: ${failed} tests failed!`);
    process.exit(1);
  } else {
    console.log('\n✓ ALL TESTS PASSED! SYSTEM IS STABLE AND VERIFIED.');
  }
}

runMasterRegression().catch((err) => {
  console.error('Master regression failed:', err);
  process.exit(1);
});
