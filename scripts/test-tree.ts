import { judgeService } from '../backend/services/judge.service';

async function testTree() {
  console.log('Testing Problem 104 (Maximum Depth of Binary Tree)...');

  // Python
  const pyCode = `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
`;
  const resPy = await judgeService.runProblem('104', 'python', pyCode);
  console.log('Python Result:', resPy.verdict, `passed=${resPy.passedTests}/${resPy.totalTests}`);
  if (resPy.verdict !== 'ACCEPTED') throw new Error(`Python Tree failed: ${resPy.verdict}`);

  // JavaScript
  const jsCode = `var maxDepth = function(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};`;
  const resJs = await judgeService.runProblem('104', 'javascript', jsCode);
  console.log('JS Result:', resJs.verdict, `passed=${resJs.passedTests}/${resJs.totalTests}`);
  if (resJs.verdict !== 'ACCEPTED') throw new Error(`JS Tree failed: ${resJs.verdict}`);

  // Java
  const javaCode = `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`;
  const resJava = await judgeService.runProblem('104', 'java', javaCode);
  console.log('Java Result:', resJava.verdict, `passed=${resJava.passedTests}/${resJava.totalTests}`);
  if (resJava.verdict !== 'ACCEPTED') throw new Error(`Java Tree failed: ${resJava.verdict}`);

  console.log('✓ Binary Tree passed across Python, JavaScript, and Java!');
}

testTree().catch(console.error);
