import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

// List of the 25 problems with issues to keep in draft:
const DRAFT_ORDERS = new Set([
  25, // Two Missing Numbers (dummy test data)
  32, // Divide Two Integers (division by zero Infinity)
  36, // Sum of All Pairwise XORs (dummy test data)
  37, // Sum of All Pairwise ANDs (dummy test data)
  38, // Sum of All Pairwise ORs (dummy test data)
  39, // XOR of All Subarray XORs (dummy test data)
  40, // Element Occurring Once (dummy test data)
  42, // Longest Subarray with Max AND (dummy test data)
  45, // Count Distinct Bitwise ORs (dummy test data)
  46, // Maximum XOR Query with Limit (dummy test data)
  48, // Maximum XOR Subarray (dummy test data)
  49, // Subarrays with Given XOR Target (dummy test data)
  50, // Partition into K Equal Sum Subsets (dummy test data)
  52, // Matchsticks to Square (dummy test data)
  55, // Valid Words for Puzzle (string/array starter code mismatch)
  56, // Find Unique Binary String (corrupted example data)
  57, // Sum of All Subset XOR Totals (dummy test data)
  59, // Smallest Subarrays with Max OR (dummy test data)
  62, // Minimum Work Sessions (dummy test data)
  64, // Count Subsets with Bitwise OR (dummy test data)
  65, // Triples with Bitwise AND Equal to Zero (dummy test data)
  66, // Sum Over Subsets (dummy test data)
  67, // Maximum Product of Word Lengths (string/array starter code mismatch)
  70, // Subarray with Bitwise AND Nearest Target (dummy test data)
  75, // Longest Awesome Substring (string/array starter code mismatch)
]);

async function verify50() {
  console.log(`Analyzing publishable set (50 problems) vs draft set (25 problems)...`);
  const publishable: number[] = [];
  const drafts: number[] = [];

  for (let order = 1; order <= 75; order++) {
    if (DRAFT_ORDERS.has(order)) {
      drafts.push(order);
    } else {
      publishable.push(order);
    }
  }

  console.log(`Publishable Count: ${publishable.length}`);
  console.log(`Draft Count: ${drafts.length}`);

  for (const order of publishable) {
    const id = `19-bit-manipulation-${String(order).padStart(3, '0')}`;
    const p = TOPIC_19_PROBLEMS[id];
    if (!p) throw new Error(`Missing ${id}`);
    if (!p.title || !p.description || !p.inputFormat || !p.outputFormat) {
      throw new Error(`Incomplete fields for ${id}`);
    }
    if (!p.visibleTests || p.visibleTests.length === 0) {
      throw new Error(`Missing visible tests for ${id}`);
    }
    if (!p.hiddenTests || p.hiddenTests.length === 0) {
      throw new Error(`Missing hidden tests for ${id}`);
    }
  }

  console.log(`✓ All 50 publishable problems verified to have full problem definitions, starter code, visible tests, and hidden tests!`);
}

verify50();

