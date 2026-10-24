import fs from 'fs';
import path from 'path';
import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

const DRAFT_ORDERS = new Set([
  25, // Two Missing Numbers in 1 to N (copied dummy test data)
  32, // Divide Two Integers with Bit Shifts (division by zero Infinity)
  36, // Sum of All Pairwise XORs (copied dummy test data)
  37, // Sum of All Pairwise ANDs (copied dummy test data)
  38, // Sum of All Pairwise ORs (copied dummy test data)
  39, // XOR of All Subarray XORs (copied dummy test data)
  40, // Element Occurring Once (Others K Times) (copied dummy test data)
  42, // Longest Subarray with Maximum AND (copied dummy test data)
  45, // Count Distinct Bitwise ORs of Subarrays (copied dummy test data)
  46, // Maximum XOR Query with Limit (copied dummy test data)
  48, // Maximum XOR Subarray (copied dummy test data)
  49, // Subarrays with Given XOR Target (copied dummy test data)
  50, // Partition into K Equal Sum Subsets (copied dummy test data)
  52, // Matchsticks to Square Bitmask (copied dummy test data)
  55, // Valid Words for Puzzle Bitmask (starter code/test mismatch)
  56, // Find Unique Binary String (corrupted example data)
  57, // Sum of All Subset XOR Totals (copied dummy test data)
  59, // Smallest Subarrays with Maximum OR (copied dummy test data)
  62, // Minimum Work Sessions to Finish Tasks (copied dummy test data)
  64, // Count Subsets with Given Bitwise OR (copied dummy test data)
  65, // Triples with Bitwise AND Equal to Zero (copied dummy test data)
  66, // Sum Over Subsets (SOS DP) (copied dummy test data)
  67, // Maximum Product of Word Lengths (starter code/test mismatch)
  70, // Subarray with Bitwise AND Nearest Target (copied dummy test data)
  75, // Longest Awesome Substring (starter code/test mismatch)
]);

function buildActiveTopic19() {
  const verifiedMap: Record<string, any> = {};

  for (let order = 1; order <= 75; order++) {
    if (DRAFT_ORDERS.has(order)) continue;

    const id = `19-bit-manipulation-${String(order).padStart(3, '0')}`;
    const p = TOPIC_19_PROBLEMS[id];
    if (!p) continue;

    const clone = JSON.parse(JSON.stringify(p));

    // Normalization fix for Problem 19 (12345 ^ 54321 is 5, not 8)
    if (order === 19) {
      for (const t of clone.hiddenTests) {
        if (t.id === 'h3') {
          t.expectedOutput = '5\n';
        }
      }
    }

    clone.status = 'published';
    clone.isDraft = false;

    verifiedMap[id] = clone;
  }

  const publishedCount = Object.keys(verifiedMap).length;
  console.log(`Verified publishable Topic 19 problems: ${publishedCount}`);
  if (publishedCount !== 50) {
    throw new Error(`Expected exactly 50 publishable problems, got ${publishedCount}`);
  }

  // Create directory if needed
  const targetDir = path.resolve('dsa/data/topics');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'topic-19.ts');
  const fileContent = `import { InternalProblemDefinition } from '../../../src/types/dsa.types';\n\n` +
    `// 50 verified, validated algorithmic Bit Manipulation problems\n` +
    `// (The remaining 25 problems remain in draft in getCurriculumPattern)\n` +
    `export const TOPIC_19_PROBLEMS: Record<string, Partial<InternalProblemDefinition>> = ${JSON.stringify(verifiedMap, null, 2)};\n`;

  fs.writeFileSync(targetFile, fileContent, 'utf8');
  console.log(`✓ Successfully wrote ${publishedCount} verified problems to ${targetFile}`);
}

buildActiveTopic19();

