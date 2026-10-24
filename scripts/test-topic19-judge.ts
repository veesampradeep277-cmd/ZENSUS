import { judgeService } from '../backend/services/judge.service';

async function testTopic19Judge() {
  console.log('Testing Judge Service with Topic 19 (19-bit-manipulation-001: Single Number Non-Repeating)...');

  // Python solution for Single Number
  const pyCode = `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    ans = 0
    for i in range(1, n + 1):
        ans ^= int(tokens[i])
    print(ans)

if __name__ == "__main__":
    solve()
`;

  console.log('1. Testing 19-bit-manipulation-001 with Python (run)...');
  const resPy = await judgeService.runProblem('19-bit-manipulation-001', 'python', pyCode);
  console.log(`   Run Verdict: ${resPy.verdict} (Passed: ${resPy.passedTests}/${resPy.totalTests})`);
  if (resPy.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED for Python run, got ${resPy.verdict}`);

  console.log('2. Testing 19-bit-manipulation-001 with Python (submit)...');
  const subPy = await judgeService.submitProblem('19-bit-manipulation-001', 'python', pyCode);
  console.log(`   Submit Verdict: ${subPy.verdict} (Passed: ${subPy.passedTests}/${subPy.totalTests})`);
  if (subPy.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED for Python submit, got ${subPy.verdict}`);

  // JavaScript solution for Single Number
  const jsCode = `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!input || input.length <= 1 || input[0] === '') return;
    const n = parseInt(input[0], 10);
    let ans = 0;
    for (let i = 1; i <= n; i++) {
        ans ^= parseInt(input[i], 10);
    }
    console.log(ans);
}

solve();
`;

  console.log('3. Testing 19-bit-manipulation-001 with JavaScript (run)...');
  const resJs = await judgeService.runProblem('19-bit-manipulation-001', 'javascript', jsCode);
  console.log(`   Run Verdict: ${resJs.verdict} (Passed: ${resJs.passedTests}/${resJs.totalTests})`);
  if (resJs.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED for JavaScript run, got ${resJs.verdict}`);

  console.log('4. Testing 19-bit-manipulation-001 with JavaScript (submit)...');
  const subJs = await judgeService.submitProblem('19-bit-manipulation-001', 'javascript', jsCode);
  console.log(`   Submit Verdict: ${subJs.verdict} (Passed: ${subJs.passedTests}/${subJs.totalTests})`);
  if (subJs.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED for JavaScript submit, got ${subJs.verdict}`);

  // Java solution for Single Number
  const javaCode = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            ans ^= sc.nextInt();
        }
        System.out.println(ans);
    }
}
`;

  console.log('5. Testing 19-bit-manipulation-001 with Java (run)...');
  const resJava = await judgeService.runProblem('19-bit-manipulation-001', 'java', javaCode);
  console.log(`   Run Verdict: ${resJava.verdict} (Passed: ${resJava.passedTests}/${resJava.totalTests})`);
  if (resJava.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED for Java run, got ${resJava.verdict}`);

  console.log('6. Testing 19-bit-manipulation-001 with Java (submit)...');
  const subJava = await judgeService.submitProblem('19-bit-manipulation-001', 'java', javaCode);
  console.log(`   Submit Verdict: ${subJava.verdict} (Passed: ${subJava.passedTests}/${subJava.totalTests})`);
  if (subJava.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED for Java submit, got ${subJava.verdict}`);

  // C++ check
  const cppRunner = new (await import('../backend/runners/cpp.runner')).CppRunner();
  const cppAvail = await cppRunner.checkAvailability();
  if (cppAvail.available) {
    console.log('7. Testing 19-bit-manipulation-001 with C++ (run)...');
    const cppCode = `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            ans ^= x;
        }
        cout << ans << "\\n";
    }
    return 0;
}
`;
    const resCpp = await judgeService.runProblem('19-bit-manipulation-001', 'cpp', cppCode);
    console.log(`   Run Verdict: ${resCpp.verdict} (Passed: ${resCpp.passedTests}/${resCpp.totalTests})`);
  } else {
    console.log('7. C++ (g++) is not available in the current environment (as expected on this Windows host).');
  }

  console.log('\n✓ All Topic 19 Judge Tests Passed Successfully!');
}

testTopic19Judge().catch(err => {
  console.error('Judge test failed:', err);
  process.exit(1);
});
