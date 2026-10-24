/**
 * Phase 2 Full Audit: Topic 19 — Bit Manipulation (75 problems)
 */

import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

const ids = Object.keys(TOPIC_19_PROBLEMS);
console.log(`\n=== TOPIC 19 AUDIT REPORT ===`);
console.log(`Total entries found: ${ids.length}`);

const errors: string[] = [];
const warnings: string[] = [];
const titleSet = new Set<string>();
const idSet = new Set<string>();
let publishedCount = 0;
let draftCount = 0;
let testedCount = 0;
let testFailCount = 0;

// Reference solutions for spot-checking
const referenceSolutions: Record<string, (input: string) => string> = {
  '19-bit-manipulation-001': (input: string) => {
    const tokens = input.trim().split(/\s+/);
    const n = parseInt(tokens[0]);
    let result = 0;
    for (let i = 1; i <= n; i++) result ^= parseInt(tokens[i]);
    return result.toString();
  },
  '19-bit-manipulation-002': (input: string) => {
    let n = parseInt(input.trim());
    let count = 0;
    while (n > 0) { count += n & 1; n >>>= 1; }
    return count.toString();
  },
  '19-bit-manipulation-003': (input: string) => {
    const n = parseInt(input.trim());
    const result: number[] = [];
    for (let i = 0; i <= n; i++) {
      let c = 0, x = i;
      while (x > 0) { c += x & 1; x >>>= 1; }
      result.push(c);
    }
    return result.join(' ');
  },
  '19-bit-manipulation-004': (input: string) => {
    const n = parseInt(input.trim()) >>> 0;
    let result = 0;
    for (let i = 0; i < 32; i++) {
      result = (result << 1) | ((n >>> i) & 1);
    }
    return (result >>> 0).toString();
  },
  '19-bit-manipulation-005': (input: string) => {
    const tokens = input.trim().split(/\s+/);
    let m = parseInt(tokens[0]);
    let n = parseInt(tokens[1]);
    let shift = 0;
    while (m !== n) {
      m >>= 1;
      n >>= 1;
      shift++;
    }
    return (m << shift).toString();
  },
};

for (const id of ids) {
  const prob = TOPIC_19_PROBLEMS[id] as any;

  // 1. Check ID format
  const expectedPattern = /^19-bit-manipulation-(\d{3})$/;
  const match = id.match(expectedPattern);
  if (!match) {
    errors.push(`${id}: Invalid ID format`);
    continue;
  }

  if (idSet.has(id)) {
    errors.push(`${id}: DUPLICATE ID`);
  }
  idSet.add(id);

  // 2. Check title uniqueness
  if (!prob.title || prob.title.trim() === '') {
    errors.push(`${id}: Missing title`);
  } else if (titleSet.has(prob.title)) {
    errors.push(`${id}: Duplicate title "${prob.title}"`);
  }
  titleSet.add(prob.title);

  // 3. Check required fields
  const requiredFields = ['title', 'difficulty', 'order', 'progressionStage', 'tags',
    'description', 'inputFormat', 'outputFormat', 'constraints', 'examples',
    'visibleTests', 'hiddenTests', 'starterCode'];
  for (const field of requiredFields) {
    if (prob[field] === undefined || prob[field] === null) {
      errors.push(`${id}: Missing required field "${field}"`);
    }
  }

  // 4. Check order matches ID number
  const order = prob.order;
  if (order !== undefined) {
    const num = parseInt(match![1]);
    if (num !== order) {
      errors.push(`${id}: Order ${order} doesn't match ID number ${num}`);
    }
  }

  // 5. Check starter code for all 4 languages
  if (prob.starterCode) {
    const languages = ['python', 'cpp', 'java', 'javascript'];
    for (const lang of languages) {
      if (!prob.starterCode[lang] || prob.starterCode[lang].trim() === '') {
        errors.push(`${id}: Missing starter code for ${lang}`);
      }
    }
  }

  // 6. Check test cases
  if (prob.visibleTests && prob.visibleTests.length === 0) {
    errors.push(`${id}: No visible test cases`);
  }
  if (prob.hiddenTests && prob.hiddenTests.length === 0) {
    errors.push(`${id}: No hidden test cases`);
  }

  // Validate test case structure
  if (prob.visibleTests) {
    const testIds = new Set<string>();
    for (const tc of prob.visibleTests) {
      if (!tc.id || !tc.input || tc.expectedOutput === undefined) {
        errors.push(`${id}: Visible test missing required fields`);
      }
      if (testIds.has(tc.id)) {
        errors.push(`${id}: Duplicate visible test ID "${tc.id}"`);
      }
      testIds.add(tc.id);
    }
  }

  if (prob.hiddenTests) {
    const testIds = new Set<string>();
    for (const tc of prob.hiddenTests) {
      if (!tc.id || !tc.input || tc.expectedOutput === undefined) {
        errors.push(`${id}: Hidden test missing required fields`);
      }
      if (testIds.has(tc.id)) {
        errors.push(`${id}: Duplicate hidden test ID "${tc.id}"`);
      }
      testIds.add(tc.id);
      if (!tc.isHidden) {
        warnings.push(`${id}: Hidden test ${tc.id} missing isHidden=true`);
      }
    }
  }

  // 7. Check examples consistency
  if (prob.examples && prob.visibleTests) {
    for (let i = 0; i < Math.min(prob.examples.length, prob.visibleTests.length); i++) {
      const ex = prob.examples[i];
      const vt = prob.visibleTests[i];
      const exOutputClean = ex.output.trim();
      const vtOutputClean = vt.expectedOutput.trim();
      if (exOutputClean !== vtOutputClean) {
        warnings.push(`${id}: Example ${i+1} output "${exOutputClean}" doesn't match visible test "${vtOutputClean}"`);
      }
    }
  }

  // 8. Check status
  if (prob.status === 'published') {
    publishedCount++;
  } else {
    draftCount++;
    warnings.push(`${id}: Status is "${prob.status}" (not published)`);
  }

  if (prob.isDraft === true) {
    warnings.push(`${id}: isDraft is true`);
  }

  // 9. Verify reference solutions for key problems  
  if (referenceSolutions[id]) {
    testedCount++;
    const allTests = [...(prob.visibleTests || []), ...(prob.hiddenTests || [])];
    for (const tc of allTests) {
      try {
        const expected = tc.expectedOutput.trim();
        const computed = referenceSolutions[id](tc.input);
        if (computed !== expected) {
          errors.push(`${id}: Test ${tc.id} FAILED: expected="${expected}" got="${computed}"`);
          testFailCount++;
        }
      } catch (e: any) {
        errors.push(`${id}: Test ${tc.id} reference solution ERROR: ${e.message}`);
        testFailCount++;
      }
    }
  }

  // 10. Check description is about bit manipulation
  if (prob.description) {
    const desc = prob.description.toLowerCase();
    const bitKeywords = ['bit', 'binary', 'xor', 'and', 'or', 'mask', 'hamming', 'complement',
      'shift', 'power of two', 'parity', 'popcount', 'toggle', 'swap', 'nibble',
      'unsigned', 'signed', 'set bit', 'clear bit', 'flip', 'gray code',
      'subset', 'bitmask', 'bitwise', 'two\'s complement', 'lsb', 'msb'];
    const hasBitContext = bitKeywords.some(k => desc.includes(k));
    if (!hasBitContext) {
      warnings.push(`${id} "${prob.title}": Description may not be about bit manipulation`);
    }
  }
}

// Check completeness (001-075)
for (let i = 1; i <= 75; i++) {
  const expectedId = `19-bit-manipulation-${String(i).padStart(3, '0')}`;
  if (!idSet.has(expectedId)) {
    errors.push(`Missing problem: ${expectedId}`);
  }
}

// Print results
console.log(`\n--- Summary ---`);
console.log(`Total problems: ${ids.length}`);
console.log(`Published: ${publishedCount}`);
console.log(`Drafts: ${draftCount}`);
console.log(`Unique titles: ${titleSet.size}`);
console.log(`Reference-tested: ${testedCount} problems (first 5)`);
console.log(`Test failures: ${testFailCount}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log(`\n--- ERRORS ---`);
  errors.forEach(e => console.log(`  ❌ ${e}`));
}

if (warnings.length > 0) {
  console.log(`\n--- WARNINGS ---`);
  warnings.forEach(w => console.log(`  ⚠️  ${w}`));
}

if (errors.length === 0) {
  console.log(`\n✅ ALL 75 TOPIC 19 PROBLEMS PASS AUDIT`);
} else {
  console.log(`\n❌ AUDIT FAILED: ${errors.length} errors need fixing`);
  process.exit(1);
}
