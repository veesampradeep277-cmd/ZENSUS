import { judgeService } from '../backend/services/judge.service';

async function testDiverseProblems() {
  console.log('Testing diverse catalog problems across topics...\n');

  // Test 1: Problem 20 - Valid Parentheses (String / Stack)
  console.log('--- Testing Problem 20 (Valid Parentheses) ---');
  const p20Py = `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack
`;
  const res20Py = await judgeService.runProblem('20', 'python', p20Py);
  console.log(`P20 Python: ${res20Py.verdict} (${res20Py.passedTests}/${res20Py.totalTests} passed)`);
  if (res20Py.verdict !== 'ACCEPTED') throw new Error(`P20 Python failed: ${res20Py.verdict}`);

  const p20Js = `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
};`;
  const res20Js = await judgeService.runProblem('20', 'javascript', p20Js);
  console.log(`P20 JS: ${res20Js.verdict} (${res20Js.passedTests}/${res20Js.totalTests} passed)`);
  if (res20Js.verdict !== 'ACCEPTED') throw new Error(`P20 JS failed: ${res20Js.verdict}`);

  // Test 2: Problem 70 - Climbing Stairs (Dynamic Programming / Math)
  console.log('\n--- Testing Problem 70 (Climbing Stairs) ---');
  const p70Py = `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b
`;
  const res70Py = await judgeService.runProblem('70', 'python', p70Py);
  console.log(`P70 Python: ${res70Py.verdict} (${res70Py.passedTests}/${res70Py.totalTests} passed)`);
  if (res70Py.verdict !== 'ACCEPTED') throw new Error(`P70 Python failed: ${res70Py.verdict}`);

  const p70Java = `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`;
  const res70Java = await judgeService.runProblem('70', 'java', p70Java);
  console.log(`P70 Java: ${res70Java.verdict} (${res70Java.passedTests}/${res70Java.totalTests} passed)`);
  if (res70Java.verdict !== 'ACCEPTED') throw new Error(`P70 Java failed: ${res70Java.verdict}`);

  // Test 3: Problem 121 - Best Time to Buy and Sell Stock (Greedy / Array)
  console.log('\n--- Testing Problem 121 (Best Time to Buy and Sell Stock) ---');
  const p121Py = `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_p = float('inf')
        max_p = 0
        for p in prices:
            if p < min_p:
                min_p = p
            elif p - min_p > max_p:
                max_p = p - min_p
        return max_p
`;
  const res121Py = await judgeService.runProblem('121', 'python', p121Py);
  console.log(`P121 Python: ${res121Py.verdict} (${res121Py.passedTests}/${res121Py.totalTests} passed)`);
  if (res121Py.verdict !== 'ACCEPTED') throw new Error(`P121 Python failed: ${res121Py.verdict}`);

  const p121Js = `var maxProfit = function(prices) {
    let minP = Infinity, maxP = 0;
    for (const p of prices) {
        if (p < minP) minP = p;
        else if (p - minP > maxP) maxP = p - minP;
    }
    return maxP;
};`;
  const res121Js = await judgeService.runProblem('121', 'javascript', p121Js);
  console.log(`P121 JS: ${res121Js.verdict} (${res121Js.passedTests}/${res121Js.totalTests} passed)`);
  if (res121Js.verdict !== 'ACCEPTED') throw new Error(`P121 JS failed: ${res121Js.verdict}`);

  const p121Java = `class Solution {
    public int maxProfit(int[] prices) {
        int minP = Integer.MAX_VALUE;
        int maxP = 0;
        for (int p : prices) {
            if (p < minP) minP = p;
            else if (p - minP > maxP) maxP = p - minP;
        }
        return maxP;
    }
}`;
  const res121Java = await judgeService.runProblem('121', 'java', p121Java);
  console.log(`P121 Java: ${res121Java.verdict} (${res121Java.passedTests}/${res121Java.totalTests} passed)`);
  if (res121Java.verdict !== 'ACCEPTED') throw new Error(`P121 Java failed: ${res121Java.verdict}`);

  console.log('\n✓ All tested diverse problems passed successfully!');
}

testDiverseProblems().catch((err) => {
  console.error('Test diverse problems failed:', err);
  process.exit(1);
});
