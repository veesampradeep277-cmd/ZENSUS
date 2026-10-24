import { judgeService } from '../backend/services/judge.service';

async function testJudge() {
  console.log('Testing Judge Service with real test cases...');

  // Test 1: Correct Python solution on Sum of Two Integers
  const correctPy = `import sys
lines = sys.stdin.read().split()
if lines:
    print(int(lines[0]) + int(lines[1]))
`;
  console.log('1. Testing Correct Python...');
  const res1 = await judgeService.runProblem('01-input-output-001', 'python', correctPy);
  console.log(`   Run Verdict: ${res1.verdict} (Passed: ${res1.passedTests}/${res1.totalTests})`);
  if (res1.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED, got ${res1.verdict}`);

  // Test 2: Submit Correct Python
  console.log('2. Testing Submit Correct Python...');
  const sub1 = await judgeService.submitProblem('01-input-output-001', 'python', correctPy);
  console.log(`   Submit Verdict: ${sub1.verdict} (Passed: ${sub1.passedTests}/${sub1.totalTests})`);
  if (sub1.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED on submit, got ${sub1.verdict}`);

  // Test 3: Incorrect Python solution
  console.log('3. Testing Wrong Answer Python...');
  const wrongPy = `import sys
print(999999)
`;
  const res3 = await judgeService.runProblem('01-input-output-001', 'python', wrongPy);
  console.log(`   Run Verdict: ${res3.verdict} (Passed: ${res3.passedTests}/${res3.totalTests})`);
  if (res3.verdict !== 'WRONG_ANSWER') throw new Error(`Expected WRONG_ANSWER, got ${res3.verdict}`);

  // Test 4: Compilation Error C++
  console.log('4. Testing Compilation Error C++...');
  const badCpp = `#include <iostream>
int main() {
    this_is_an_invalid_syntax_error;;;;
}
`;
  const res4 = await judgeService.runProblem('01-input-output-001', 'cpp', badCpp);
  console.log(`   Run Verdict: ${res4.verdict}`);
  if (res4.verdict !== 'COMPILATION_ERROR') throw new Error(`Expected COMPILATION_ERROR, got ${res4.verdict}`);

  // Test 5: Timeout Python
  console.log('5. Testing Time Limit Exceeded Python...');
  const loopPy = `import time
while True:
    time.sleep(0.5)
`;
  const res5 = await judgeService.runProblem('01-input-output-001', 'python', loopPy);
  console.log(`   Run Verdict: ${res5.verdict}`);
  if (res5.verdict !== 'TIME_LIMIT_EXCEEDED') throw new Error(`Expected TIME_LIMIT_EXCEEDED, got ${res5.verdict}`);

  // Test 6: Java solution on Sum of Two Integers
  console.log('6. Testing Correct Java...');
  const correctJava = `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong();
            long b = sc.nextLong();
            System.out.println(a + b);
        }
    }
}`;
  const resJava = await judgeService.runProblem('01-input-output-001', 'java', correctJava);
  console.log(`   Run Verdict Java: ${resJava.verdict} (Passed: ${resJava.passedTests}/${resJava.totalTests})`);
  if (resJava.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED on Java, got ${resJava.verdict}`);

  // Test 7: JavaScript solution on Sum of Two Integers
  console.log('7. Testing Correct JavaScript...');
  const correctJs = `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);
if (input.length >= 2) {
    console.log(Number(input[0]) + Number(input[1]));
}`;
  // Or using process.stdin for cross-platform
  const correctJsStdin = `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length >= 2 && input[0] !== '') {
    console.log(Number(input[0]) + Number(input[1]));
}`;
  const resJs = await judgeService.runProblem('01-input-output-001', 'javascript', correctJsStdin);
  console.log(`   Run Verdict JavaScript: ${resJs.verdict} (Passed: ${resJs.passedTests}/${resJs.totalTests})`);
  if (resJs.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED on JavaScript, got ${resJs.verdict}`);

  // Test 8: C++ test if g++ available
  const cppRunner = new (await import('../backend/runners/cpp.runner')).CppRunner();
  const cppAvail = await cppRunner.checkAvailability();
  if (cppAvail.available) {
    console.log('8. Testing Correct C++...');
    const correctCpp = `#include <iostream>
using namespace std;
int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << a + b << "\\n";
    }
    return 0;
}
`;
    const res6 = await judgeService.runProblem('01-input-output-001', 'cpp', correctCpp);
    console.log(`   Run Verdict C++: ${res6.verdict} (Passed: ${res6.passedTests}/${res6.totalTests})`);
    if (res6.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED on C++, got ${res6.verdict}`);
  } else {
    console.log('8. Skipping C++ execution (g++ not installed in environment)');
  }

  console.log('✓ ALL JUDGE TESTS PASSED DETERMINISTICALLY!');
}

testJudge().catch((err) => {
  console.error('Judge Test FAILED:', err);
  process.exit(1);
});

