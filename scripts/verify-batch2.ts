import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

const solvers2: Record<number, (input: string) => string> = {
  // 21: Binary Palindrome Check
  21: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const binStr = n.toString(2);
    const revStr = binStr.split('').reverse().join('');
    return binStr === revStr ? 'YES' : 'NO';
  },
  // 22: Gray Code Sequence of N Bits
  22: (input) => {
    const n = parseInt(input.trim().split(/\s+/)[0], 10);
    const len = 1 << n;
    const res: number[] = [];
    for (let i = 0; i < len; i++) {
      res.push(i ^ (i >> 1));
    }
    return res.join(' ');
  },
  // 23: Binary to Gray Code Converter
  23: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n ^ (n >> 1n)).toString();
  },
  // 24: Gray Code to Binary Converter
  24: (input) => {
    let n = BigInt(input.trim().split(/\s+/)[0]);
    let bin = 0n;
    while (n > 0n) {
      bin ^= n;
      n >>= 1n;
    }
    return bin.toString();
  },
  // 26: Set the Rightmost Unset Bit
  26: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n | (n + 1n)).toString();
  },
  // 27: Check Alternating Bits
  27: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const s = n.toString(2);
    for (let i = 1; i < s.length; i++) {
      if (s[i] === s[i - 1]) return 'NO';
    }
    return 'YES';
  },
  // 28: Count Trailing Zeroes
  28: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n === 0n) return '32';
    let count = 0;
    let t = n;
    while ((t & 1n) === 0n) {
      count++;
      t >>= 1n;
    }
    return String(count);
  },
  // 29: Count Leading Zeroes in 32-bit
  29: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n === 0n) return '32';
    const s = n.toString(2);
    return String(32 - s.length);
  },
  // 30: Clear Bits from LSB to K-th Bit (0 to K)
  30: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = tokens[0], k = tokens[1];
    const mask = ~((1n << (k + 1n)) - 1n);
    return (n & mask).toString();
  },
  // 32: Divide Two Integers with Bit Shifts
  32: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    let a = tokens[0], b = tokens[1];
    let ans = a / b;
    return ans.toString();
  },
  // 33: Russian Peasant Bitwise Multiplication
  33: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    let a = tokens[0], b = tokens[1];
    return (a * b).toString();
  },
  // 34: Add Two Integers Without Plus Operator
  34: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    return (tokens[0] + tokens[1]).toString();
  },
  // 35: Maximum XOR Pair in Array
  35: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    const arr = tokens.slice(1, n + 1);
    let maxVal = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        maxVal = Math.max(maxVal, arr[i] ^ arr[j]);
      }
    }
    return String(maxVal);
  },
  // 36: Sum of All Pairwise XORs
  36: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = Number(tokens[0]);
    const arr = tokens.slice(1, n + 1);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        sum += (arr[i] ^ arr[j]);
      }
    }
    return sum.toString();
  },
  // 37: Sum of All Pairwise ANDs
  37: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = Number(tokens[0]);
    const arr = tokens.slice(1, n + 1);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        sum += (arr[i] & arr[j]);
      }
    }
    return sum.toString();
  },
  // 38: Sum of All Pairwise ORs
  38: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = Number(tokens[0]);
    const arr = tokens.slice(1, n + 1);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        sum += (arr[i] | arr[j]);
      }
    }
    return sum.toString();
  },
  // 39: XOR of All Subarray XORs
  39: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    const arr = tokens.slice(1, n + 1);
    let res = 0;
    for (let i = 0; i < n; i++) {
      const freq = (i + 1) * (n - i);
      if (freq % 2 === 1) res ^= arr[i];
    }
    return String(res);
  },
  // 41: Longest Consecutive 1s in Binary
  41: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const s = n.toString(2);
    let maxC = 0, cur = 0;
    for (const ch of s) {
      if (ch === '1') { cur++; maxC = Math.max(maxC, cur); }
      else cur = 0;
    }
    return String(maxC);
  },
  // 43: Smallest Power of 2 Geq N
  43: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n <= 1n) return '1';
    let p = 1n;
    while (p < n) p <<= 1n;
    return p.toString();
  },
  // 44: Largest Power of 2 Leq N
  44: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    let p = 1n;
    while ((p << 1n) <= n) p <<= 1n;
    return p.toString();
  },
  // 57: Sum of All Subset XOR Totals
  57: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    const arr = tokens.slice(1, n + 1);
    let orAll = 0;
    for (const x of arr) orAll |= x;
    return String(orAll * (1 << (n - 1)));
  }
};

async function testBatch2() {
  console.log('Testing Batch 2 solvers:');
  for (const [orderStr, solver] of Object.entries(solvers2)) {
    const order = Number(orderStr);
    const id = `19-bit-manipulation-${String(order).padStart(3, '0')}`;
    const p = TOPIC_19_PROBLEMS[id];
    if (!p) continue;

    let allPassed = true;
    const tests = [...(p.visibleTests || []), ...(p.hiddenTests || [])];
    for (const t of tests) {
      const actual = solver(t.input);
      const expected = t.expectedOutput.trim();
      if (actual !== expected) {
        console.log(`[#${order}] FAILED on test ${t.id}: input="${t.input.trim()}" expected="${expected}" actual="${actual}"`);
        allPassed = false;
        break;
      }
    }
    if (allPassed) {
      console.log(`[#${order}] ✓ PASSED all ${tests.length} tests: ${p.title}`);
    }
  }
}

testBatch2();

