import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

async function fullAudit() {
  const problems = TOPIC_19_PROBLEMS;
  const verifiedList: number[] = [];
  const draftList: { order: number; title: string; reason: string }[] = [];

  for (let order = 1; order <= 75; order++) {
    const id = `19-bit-manipulation-${String(order).padStart(3, '0')}`;
    const p = problems[id];
    if (!p) {
      draftList.push({ order, title: 'Missing', reason: 'Missing problem definition' });
      continue;
    }

    // Check 1: Title and statement
    if (!p.title || !p.description || p.description.length < 30) {
      draftList.push({ order, title: p.title || 'Untitled', reason: 'Incomplete description' });
      continue;
    }

    // Check 2: Test counts
    const vTests = p.visibleTests || [];
    const hTests = p.hiddenTests || [];
    if (vTests.length === 0 || hTests.length === 0) {
      draftList.push({ order, title: p.title, reason: `Insufficient test cases (v:${vTests.length}, h:${hTests.length})` });
      continue;
    }

    // Check 3: Check starter code vs input format
    const py = (p.starterCode as any)?.python || '';
    const inFmt = (p.inputFormat || '').toLowerCase();
    
    // Check specific known flawed problems
    if (order === 19) {
      // Problem 19 has mathematical error in h3 (12345 ^ 54321 is 5, not 8)
      draftList.push({ order, title: p.title, reason: 'Hidden test h3 has mathematically incorrect expected output (expected 8, true XOR hamming distance is 5)' });
      continue;
    }

    if (order === 32) {
      // Problem 32 has division by zero in h2 expecting "Infinity\n" which crashes all language runners
      draftList.push({ order, title: p.title, reason: 'Hidden test h2 tests division by zero expecting string "Infinity", causing SIGFPE / ZeroDivisionError on all standard runners' });
      continue;
    }

    if (order === 55 || order === 56 || order === 67 || order === 75) {
      draftList.push({ order, title: p.title, reason: 'Starter code / test case format mismatch (string tokens parsed as integer array)' });
      continue;
    }

    // Check 4: Check if description and examples are aligned
    let exampleMismatch = false;
    for (const ex of p.examples || []) {
      if (ex.input === undefined || ex.output === undefined || ex.input === 'N/A') {
        exampleMismatch = true;
        break;
      }
    }
    if (exampleMismatch) {
      draftList.push({ order, title: p.title, reason: 'Missing or placeholder examples' });
      continue;
    }

    // Check 5: Check if visible tests match examples
    if (vTests.length > 0 && p.examples && p.examples.length > 0) {
      const ex1In = p.examples[0].input.trim();
      const v1In = vTests[0].input.trim();
      if (ex1In !== v1In) {
        draftList.push({ order, title: p.title, reason: `Example 1 input ("${ex1In}") does not match Visible Test 1 input ("${v1In}")` });
        continue;
      }
    }

    verifiedList.push(order);
  }

  console.log(`Audited all 75 problems:`);
  console.log(`Verified & publishable candidate count: ${verifiedList.length}`);
  console.log(`Kept in Draft count: ${draftList.length}`);
  console.log('\n--- Draft Items & Reasons ---');
  for (const d of draftList) {
    console.log(`[#${String(d.order).padStart(2, '0')}] ${d.title}: ${d.reason}`);
  }
}

fullAudit();

