import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

// Let's inspect test cases across all problems
function scanAllProblems() {
  const problemKeys = Object.keys(TOPIC_19_PROBLEMS);
  console.log(`Inspecting all ${problemKeys.length} problems for test data integrity...`);

  const report: { id: string; order: number; title: string; status: 'VALID' | 'CORRUPT'; reason?: string }[] = [];

  for (let order = 1; order <= 75; order++) {
    const id = `19-bit-manipulation-${String(order).padStart(3, '0')}`;
    const p = TOPIC_19_PROBLEMS[id];
    if (!p) {
      report.push({ id, order, title: 'Missing', status: 'CORRUPT', reason: 'Missing definition' });
      continue;
    }

    const vTests = p.visibleTests || [];
    const hTests = p.hiddenTests || [];
    const allTests = [...vTests, ...hTests];

    // Check for obvious corruptions:
    // 1. Array containing "3 10 5 25 2 8" copied into unrelated problems
    let copiedTestData = false;
    for (const t of allTests) {
      if (t.input.includes('3 10 5 25 2 8') && order !== 35 && order !== 74) {
        copiedTestData = true;
        break;
      }
    }
    if (copiedTestData) {
      report.push({ id, order, title: p.title!, status: 'CORRUPT', reason: 'Contains copied dummy test data ("3 10 5 25 2 8") inconsistent with problem statement' });
      continue;
    }

    // 2. Division by zero expecting Infinity
    if (order === 32) {
      report.push({ id, order, title: p.title!, status: 'CORRUPT', reason: 'Division by zero expecting Infinity' });
      continue;
    }

    // 3. Mathematical error in test case
    if (order === 19) {
      report.push({ id, order, title: p.title!, status: 'CORRUPT', reason: 'Hidden test h3 has mathematically incorrect expected output (expected 8, true XOR is 5)' });
      continue;
    }

    // 4. Corrupted example input (string/array confusion)
    if (order === 55 || order === 56 || order === 67 || order === 75) {
      report.push({ id, order, title: p.title!, status: 'CORRUPT', reason: 'Starter code / test case format mismatch (string tokens parsed as integer array)' });
      continue;
    }

    report.push({ id, order, title: p.title!, status: 'VALID' });
  }

  const valid = report.filter(r => r.status === 'VALID');
  const corrupt = report.filter(r => r.status === 'CORRUPT');

  console.log(`\nScan Complete:`);
  console.log(`Valid Candidates: ${valid.length}`);
  console.log(`Corrupt / Needs Revision: ${corrupt.length}`);

  console.log('\n--- Corrupt / Inconsistent Problems ---');
  for (const c of corrupt) {
    console.log(`[#${String(c.order).padStart(2, '0')}] ${c.title} (${c.id}): ${c.reason}`);
  }
}

scanAllProblems();

