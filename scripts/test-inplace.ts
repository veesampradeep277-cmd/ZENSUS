import { judgeService } from '../backend/services/judge.service';

async function testInPlace() {
  console.log('Testing Problem 283 (Move Zeroes) - In-place mutation...');

  // Python
  const pyCode = `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        pos = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[pos], nums[i] = nums[i], nums[pos]
                pos += 1
`;
  const pyRes = await judgeService.runProblem('283', 'python', pyCode);
  console.log(`Python: verdict=${pyRes.verdict}, passed=${pyRes.passedTests}/${pyRes.totalTests}`);

  // JS
  const jsCode = `var moveZeroes = function(nums) {
    let pos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            let temp = nums[pos];
            nums[pos] = nums[i];
            nums[i] = temp;
            pos++;
        }
    }
};`;
  const jsRes = await judgeService.runProblem('283', 'javascript', jsCode);
  console.log(`JS: verdict=${jsRes.verdict}, passed=${jsRes.passedTests}/${jsRes.totalTests}, actual=${JSON.stringify(jsRes.testResults.map(t => t.actualOutput))}`);

  // Java
  const javaCode = `class Solution {
    public void moveZeroes(int[] nums) {
        int pos = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                int temp = nums[pos];
                nums[pos] = nums[i];
                nums[i] = temp;
                pos++;
            }
        }
    }
}`;
  const javaRes = await judgeService.runProblem('283', 'java', javaCode);
  console.log(`Java: verdict=${javaRes.verdict}, passed=${javaRes.passedTests}/${javaRes.totalTests}, actual=${JSON.stringify(javaRes.testResults.map(t => t.actualOutput))}`);
}

testInPlace().catch(console.error);
