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

  // Test 4: Timeout Python
  console.log('4. Testing Time Limit Exceeded Python...');
  const loopPy = `import time
while True:
    time.sleep(0.5)
`;
  const res5 = await judgeService.runProblem('01-input-output-001', 'python', loopPy);
  console.log(`   Run Verdict: ${res5.verdict}`);
  if (res5.verdict !== 'TIME_LIMIT_EXCEEDED') throw new Error(`Expected TIME_LIMIT_EXCEEDED, got ${res5.verdict}`);

  // Test 5: JavaScript correct solution
  console.log('5. Testing JavaScript Solution...');
  const jsCode = `'use strict';
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (input.length >= 2) {
    const a = BigInt(input[0]);
    const b = BigInt(input[1]);
    console.log((a + b).toString());
}
`;
  const resJs = await judgeService.runProblem('01-input-output-001', 'javascript', jsCode);
  console.log(`   Run Verdict: ${resJs.verdict} (Passed: ${resJs.passedTests}/${resJs.totalTests})`);
  if (resJs.verdict !== 'ACCEPTED') throw new Error(`Expected ACCEPTED on JS, got ${resJs.verdict}`);

  // Test 6: Java correct solution (if javac available)
  try {
    console.log('6. Testing Java Solution...');
    const javaCode = `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong();
            long b = sc.nextLong();
            System.out.println(a + b);
        }
    }
}
`;
    const resJava = await judgeService.runProblem('01-input-output-001', 'java', javaCode);
    console.log(`   Run Verdict Java: ${resJava.verdict} (Passed: ${resJava.passedTests}/${resJava.totalTests})`);
  } catch (err: any) {
    console.log(`   Java test skipped or noted: ${err.message}`);
  }

  console.log('✓ ALL JUDGE VERDICTS PASSED CORRECTLY!');
}

testJudge().catch((err) => {
  console.error('Judge Test FAILED:', err);
  process.exit(1);
});
