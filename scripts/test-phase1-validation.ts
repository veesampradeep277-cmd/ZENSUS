import { problemDatabase } from '../dsa/data/problems-db';
import { judgeService } from '../backend/services/judge.service';

async function testPhase1() {
  console.log('====================================================');
  console.log('       ZENSUS DSA — PHASE 1 VALIDATION TEST         ');
  console.log('====================================================');

  const topics = problemDatabase.getAllTopics();
  let publishedCount = 0;
  let draftCount = 0;
  let fakeAdditionCount = 0;

  for (const topic of topics) {
    const problems = problemDatabase.getProblemsByTopic(topic.id);
    for (const p of problems) {
      const publicDef = problemDatabase.getPublicProblemById(p.id)!;
      const internalDef = problemDatabase.getInternalProblemById(p.id)!;

      if (publicDef.status === 'published') {
        publishedCount++;
        if (publicDef.visibleTests.length === 0) {
          throw new Error(`Published problem ${p.id} has no visible test cases!`);
        }
        if (internalDef.hiddenTests.length === 0) {
          throw new Error(`Published problem ${p.id} has no hidden test cases!`);
        }
      } else if (publicDef.status === 'draft') {
        draftCount++;
        if (publicDef.visibleTests.length > 0) {
          throw new Error(`Draft problem ${p.id} should not have visible tests!`);
        }
        if (internalDef.hiddenTests.length > 0) {
          throw new Error(`Draft problem ${p.id} should not have hidden tests!`);
        }
        // Verify no fake addition
        for (const ex of publicDef.examples) {
          if (ex.explanation && ex.explanation.includes('computed result is')) {
            fakeAdditionCount++;
          }
        }
      } else {
        throw new Error(`Problem ${p.id} has unexpected status: ${publicDef.status}`);
      }
    }
  }

  console.log(`✓ Total Topics: ${topics.length}`);
  console.log(`✓ Total Problems: ${publishedCount + draftCount}`);
  console.log(`✓ Published Problems (Handcrafted): ${publishedCount} (Expected: 10)`);
  console.log(`✓ Draft Problems (Under Authoring): ${draftCount} (Expected: 3,065)`);
  console.log(`✓ Fake Addition Test Cases Detected: ${fakeAdditionCount} (Expected: 0)`);

  if (publishedCount !== 10) throw new Error(`Expected exactly 10 published problems, got ${publishedCount}`);
  if (draftCount !== 3065) throw new Error(`Expected exactly 3065 draft problems, got ${draftCount}`);
  if (fakeAdditionCount !== 0) throw new Error(`Detected fake addition in ${fakeAdditionCount} problems!`);

  // Test Run & Submit Rejection on Draft Problem
  console.log('\n--- Testing Judge Rejection on Draft Problem (19-bit-manipulation-001) ---');
  let runRejected = false;
  try {
    await judgeService.runProblem('19-bit-manipulation-001', 'python', 'print("test")');
  } catch (err: any) {
    runRejected = true;
    console.log(`✓ judgeService.runProblem rejected draft safely: "${err.message}"`);
  }
  if (!runRejected) {
    throw new Error('judgeService.runProblem failed to reject draft problem!');
  }

  let submitRejected = false;
  try {
    await judgeService.submitProblem('19-bit-manipulation-001', 'python', 'print("test")');
  } catch (err: any) {
    submitRejected = true;
    console.log(`✓ judgeService.submitProblem rejected draft safely: "${err.message}"`);
  }
  if (!submitRejected) {
    throw new Error('judgeService.submitProblem failed to reject draft problem!');
  }

  // Test Run on Preserved Handcrafted Problem
  console.log('\n--- Testing Preserved Handcrafted Problem (01-input-output-001) ---');
  const validRun = await judgeService.runProblem('01-input-output-001', 'python', 'import sys\nprint(sum(map(int, sys.stdin.read().split())))');
  console.log(`✓ Preserved problem execution verdict: ${validRun.verdict} (Passed: ${validRun.passedTests}/${validRun.totalTests})`);
  if (validRun.verdict !== 'ACCEPTED') {
    throw new Error(`Expected ACCEPTED for valid problem, got ${validRun.verdict}`);
  }

  console.log('\n====================================================');
  console.log('       ✓ ALL PHASE 1 VALIDATIONS PASSED!            ');
  console.log('====================================================');
}

testPhase1().catch((err) => {
  console.error('Phase 1 Validation FAILED:', err);
  process.exit(1);
});

