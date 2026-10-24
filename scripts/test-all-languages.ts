import { judgeService } from '../backend/services/judge.service';
import { CRunner } from '../backend/runners/c.runner';
import { CppRunner } from '../backend/runners/cpp.runner';

async function testAll() {
  console.log('================================================================');
  console.log('   ZENSUS EXECUTION ENGINE — COMPREHENSIVE RUNNER VERIFICATION  ');
  console.log('================================================================\n');

  // 1. Python Function Correct
  const pyCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        m = {}
        for i, n in enumerate(nums):
            if target - n in m:
                return [m[target - n], i]
            m[n] = i
        return []
`;
  const pyRes = await judgeService.runProblem('1', 'python', pyCode);
  console.log(`[PASS] Python 3 Function Correct:  Verdict=${pyRes.verdict} (${pyRes.passedTests}/${pyRes.totalTests} passed, ${pyRes.runtimeMs}ms)`);
  if (pyRes.verdict !== 'ACCEPTED') throw new Error(`Python correct failed: ${pyRes.verdict}`);

  // 2. Python Stdin Correct Solution
  const pyStdin = `import sys, json
raw = sys.stdin.read().strip()
if raw:
    for line in raw.split('\\n'):
        line = line.strip()
        if not line: continue
        parts = line.split(', target = ')
        nums = json.loads(parts[0].replace('nums = ', '').strip())
        target = int(parts[1].strip())
        m = {}
        for i, n in enumerate(nums):
            if target - n in m:
                print(json.dumps([m[target - n], i]))
                break
            m[n] = i
`;
  const pyStdinRes = await judgeService.runProblem('1', 'python', pyStdin);
  console.log(`[PASS] Python 3 Stdin Correct:     Verdict=${pyStdinRes.verdict} (${pyStdinRes.passedTests}/${pyStdinRes.totalTests} passed, ${pyStdinRes.runtimeMs}ms)`);
  if (pyStdinRes.verdict !== 'ACCEPTED') throw new Error(`Python stdin correct failed: ${pyStdinRes.verdict}`);

  // 3. Python Function Wrong Answer
  const pyWrong = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        return [0, 0]
`;
  const pyWrongRes = await judgeService.runProblem('1', 'python', pyWrong);
  console.log(`[PASS] Python 3 Wrong Answer:      Verdict=${pyWrongRes.verdict} (${pyWrongRes.passedTests}/${pyWrongRes.totalTests} passed)`);
  if (pyWrongRes.verdict !== 'WRONG_ANSWER') throw new Error(`Python wrong expected WRONG_ANSWER, got: ${pyWrongRes.verdict}`);

  // 4. Python Syntax Error
  const pySyntax = `def bad_syntax:`;
  const pySyntaxRes = await judgeService.runProblem('1', 'python', pySyntax);
  console.log(`[PASS] Python 3 Syntax Error:      Verdict=${pySyntaxRes.verdict} (Clean compilation error detected)`);
  if (pySyntaxRes.verdict !== 'COMPILATION_ERROR') throw new Error(`Expected COMPILATION_ERROR, got: ${pySyntaxRes.verdict}`);

  // 5. Python Runtime Exception
  const pyRuntime = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        raise ValueError("Deliberate runtime error for testing")
`;
  const pyRuntimeRes = await judgeService.runProblem('1', 'python', pyRuntime);
  console.log(`[PASS] Python 3 Runtime Error:     Verdict=${pyRuntimeRes.verdict} (Runtime exception caught safely)`);
  if (pyRuntimeRes.verdict !== 'RUNTIME_ERROR') throw new Error(`Expected RUNTIME_ERROR, got: ${pyRuntimeRes.verdict}`);

  // 6. Python Timeout (Bounded Time Limit)
  const pyTimeout = `import time
time.sleep(4)
`;
  const pyTimeoutRes = await judgeService.runProblem('1', 'python', pyTimeout);
  console.log(`[PASS] Python 3 Timeout (TLE):     Verdict=${pyTimeoutRes.verdict} (Time limit safely enforced)`);
  if (pyTimeoutRes.verdict !== 'TIME_LIMIT_EXCEEDED') throw new Error(`Expected TIME_LIMIT_EXCEEDED, got: ${pyTimeoutRes.verdict}`);

  // 7. JavaScript Function Correct
  const jsCode = `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
    return [];
};`;
  const jsRes = await judgeService.runProblem('1', 'javascript', jsCode);
  console.log(`[PASS] JavaScript Function Correct: Verdict=${jsRes.verdict} (${jsRes.passedTests}/${jsRes.totalTests} passed, ${jsRes.runtimeMs}ms)`);
  if (jsRes.verdict !== 'ACCEPTED') throw new Error(`JS correct failed: ${jsRes.verdict}`);

  // 8. JavaScript Stdin Correct Solution
  const jsStdin = `const fs = require('fs');
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
  const jsStdinRes = await judgeService.runProblem('1', 'javascript', jsStdin);
  console.log(`[PASS] JavaScript Stdin Correct:    Verdict=${jsStdinRes.verdict} (${jsStdinRes.passedTests}/${jsStdinRes.totalTests} passed, ${jsStdinRes.runtimeMs}ms)`);
  if (jsStdinRes.verdict !== 'ACCEPTED') throw new Error(`JS stdin correct failed: ${jsStdinRes.verdict}`);

  // 9. JavaScript Function Wrong Answer
  const jsWrong = `var twoSum = function(nums, target) { return [99, 99]; };`;
  const jsWrongRes = await judgeService.runProblem('1', 'javascript', jsWrong);
  console.log(`[PASS] JavaScript Wrong Answer:    Verdict=${jsWrongRes.verdict} (${jsWrongRes.passedTests}/${jsWrongRes.totalTests} passed)`);
  if (jsWrongRes.verdict !== 'WRONG_ANSWER') throw new Error(`JS wrong expected WRONG_ANSWER, got: ${jsWrongRes.verdict}`);

  // 10. JavaScript Syntax Error
  const jsSyntax = `function bad( { return 1;`;
  const jsSyntaxRes = await judgeService.runProblem('1', 'javascript', jsSyntax);
  console.log(`[PASS] JavaScript Syntax Error:    Verdict=${jsSyntaxRes.verdict}`);
  if (jsSyntaxRes.verdict !== 'COMPILATION_ERROR' && jsSyntaxRes.verdict !== 'RUNTIME_ERROR') {
    throw new Error(`Expected syntax/compilation error, got: ${jsSyntaxRes.verdict}`);
  }

  // 11. Java Function Correct
  const javaCode = `class Solution {
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
  const javaRes = await judgeService.runProblem('1', 'java', javaCode);
  console.log(`[PASS] Java Function Correct:      Verdict=${javaRes.verdict} (${javaRes.passedTests}/${javaRes.totalTests} passed, ${javaRes.runtimeMs}ms)`);
  if (javaRes.verdict !== 'ACCEPTED') throw new Error(`Java correct failed: ${javaRes.verdict}`);

  // 12. Java Stdin Correct Solution
  const javaStdin = `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String line = sc.nextLine().trim();
            if (line.isEmpty()) continue;
            String[] parts = line.split(", target = ");
            String numsStr = parts[0].replace("nums = ", "").replace("[", "").replace("]", "").trim();
            int target = Integer.parseInt(parts[1].trim());
            String[] numParts = numsStr.split(",");
            int[] nums = new int[numParts.length];
            for (int i = 0; i < numParts.length; i++) nums[i] = Integer.parseInt(numParts[i].trim());
            Map<Integer, Integer> map = new HashMap<>();
            for (int i = 0; i < nums.length; i++) {
                int comp = target - nums[i];
                if (map.containsKey(comp)) {
                    System.out.println("[" + map.get(comp) + "," + i + "]");
                    break;
                }
                map.put(nums[i], i);
            }
        }
    }
}`;
  const javaStdinRes = await judgeService.runProblem('1', 'java', javaStdin);
  console.log(`[PASS] Java Stdin Correct:          Verdict=${javaStdinRes.verdict} (${javaStdinRes.passedTests}/${javaStdinRes.totalTests} passed, ${javaStdinRes.runtimeMs}ms)`);
  if (javaStdinRes.verdict !== 'ACCEPTED') throw new Error(`Java stdin correct failed: ${javaStdinRes.verdict}`);

  // 13. Java Function Wrong Answer
  const javaWrong = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{0, 0};
    }
}`;
  const javaWrongRes = await judgeService.runProblem('1', 'java', javaWrong);
  console.log(`[PASS] Java Wrong Answer:          Verdict=${javaWrongRes.verdict} (${javaWrongRes.passedTests}/${javaWrongRes.totalTests} passed)`);
  if (javaWrongRes.verdict !== 'WRONG_ANSWER') throw new Error(`Java wrong expected WRONG_ANSWER, got: ${javaWrongRes.verdict}`);

  // 13. Java Compilation Error
  const javaBad = `class Solution { public int[] twoSum(int[] a, int b) { syntax_error; } }`;
  const javaBadRes = await judgeService.runProblem('1', 'java', javaBad);
  console.log(`[PASS] Java Compilation Error:     Verdict=${javaBadRes.verdict} (Compiler diagnostics preserved)`);
  if (javaBadRes.verdict !== 'COMPILATION_ERROR') throw new Error(`Expected COMPILATION_ERROR, got: ${javaBadRes.verdict}`);

  // 14. C Toolchain Detection & Runner Unavailable
  const cRunner = new CRunner();
  const cAvail = await cRunner.checkAvailability();
  console.log(`[INFO] C (gcc) Toolchain:          Available=${cAvail.available} (${cAvail.notes || cAvail.version})`);
  const cRes = await judgeService.runProblem('1', 'c', 'int main(){return 0;}');
  if (!cAvail.available) {
    console.log(`[PASS] C Runner Unavailable:       Verdict=${cRes.verdict} (Correctly classified as RUNNER_UNAVAILABLE)`);
    if (cRes.verdict !== 'RUNNER_UNAVAILABLE') throw new Error(`Expected RUNNER_UNAVAILABLE for missing gcc, got: ${cRes.verdict}`);
  }

  // 15. C++ Toolchain Detection & Runner Unavailable
  const cppRunner = new CppRunner();
  const cppAvail = await cppRunner.checkAvailability();
  console.log(`[INFO] C++ (g++) Toolchain:        Available=${cppAvail.available} (${cppAvail.notes || cppAvail.version})`);
  const cppRes = await judgeService.runProblem('1', 'cpp', 'int main(){return 0;}');
  if (!cppAvail.available) {
    console.log(`[PASS] C++ Runner Unavailable:     Verdict=${cppRes.verdict} (Correctly classified as RUNNER_UNAVAILABLE)`);
    if (cppRes.verdict !== 'RUNNER_UNAVAILABLE') throw new Error(`Expected RUNNER_UNAVAILABLE for missing g++, got: ${cppRes.verdict}`);
  }

  // 16. Verify Submit Flow on Python
  const pySubmit = await judgeService.submitProblem('1', 'python', pyCode);
  console.log(`[PASS] Python 3 Submit:            Verdict=${pySubmit.verdict} (${pySubmit.passedTests}/${pySubmit.totalTests} passed, recordId=${pySubmit.submission.id})`);
  if (pySubmit.verdict !== 'ACCEPTED') throw new Error(`Python submit failed: ${pySubmit.verdict}`);

  // 17. Verify Submit Flow on JavaScript
  const jsSubmit = await judgeService.submitProblem('1', 'javascript', jsCode);
  console.log(`[PASS] JavaScript Submit:          Verdict=${jsSubmit.verdict} (${jsSubmit.passedTests}/${jsSubmit.totalTests} passed, recordId=${jsSubmit.submission.id})`);
  if (jsSubmit.verdict !== 'ACCEPTED') throw new Error(`JS submit failed: ${jsSubmit.verdict}`);

  console.log('\n================================================================');
  console.log('   ✓ ALL RUNNER VERIFICATION CHECKS COMPLETED AND VALIDATED!    ');
  console.log('================================================================\n');
}

testAll().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
