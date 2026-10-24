import { judgeService } from '../backend/services/judge.service';

async function testMatrix() {
  console.log('Testing Problem 73 (Set Matrix Zeroes) - 2D Array & In-Place...');

  // Python
  const pyCode = `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        R, C = len(matrix), len(matrix[0])
        rows, cols = set(), set()
        for r in range(R):
            for c in range(C):
                if matrix[r][c] == 0:
                    rows.add(r)
                    cols.add(c)
        for r in range(R):
            for c in range(C):
                if r in rows or c in cols:
                    matrix[r][c] = 0
`;
  const resPy = await judgeService.runProblem('73', 'python', pyCode);
  console.log('Python Matrix:', resPy.verdict, `passed=${resPy.passedTests}/${resPy.totalTests}`);
  if (resPy.verdict !== 'ACCEPTED') throw new Error(`Python matrix failed: ${resPy.verdict}`);

  // JavaScript
  const jsCode = `var setZeroes = function(matrix) {
    const R = matrix.length;
    const C = matrix[0].length;
    const rows = new Set();
    const cols = new Set();
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (matrix[r][c] === 0) {
                rows.add(r);
                cols.add(c);
            }
        }
    }
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (rows.has(r) || cols.has(c)) {
                matrix[r][c] = 0;
            }
        }
    }
};`;
  const resJs = await judgeService.runProblem('73', 'javascript', jsCode);
  console.log('JS Matrix:', resJs.verdict, `passed=${resJs.passedTests}/${resJs.totalTests}`);
  if (resJs.verdict !== 'ACCEPTED') throw new Error(`JS matrix failed: ${resJs.verdict}`);

  // Java
  const javaCode = `class Solution {
    public void setZeroes(int[][] matrix) {
        int R = matrix.length;
        int C = matrix[0].length;
        boolean[] rows = new boolean[R];
        boolean[] cols = new boolean[C];
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (matrix[r][c] == 0) {
                    rows[r] = true;
                    cols[c] = true;
                }
            }
        }
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (rows[r] || cols[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
    }
}`;
  const resJava = await judgeService.runProblem('73', 'java', javaCode);
  console.log('Java Matrix:', resJava.verdict, `passed=${resJava.passedTests}/${resJava.totalTests}`);
  if (resJava.verdict !== 'ACCEPTED') throw new Error(`Java matrix failed: ${resJava.verdict}`);

  console.log('✓ Matrix / 2D Array in-place tests PASSED across all 3 languages!');
}

testMatrix().catch(console.error);
