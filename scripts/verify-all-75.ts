import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

// Reference solvers for checking problems
const solvers: Record<number, (input: string) => string> = {
  // 1: Single Number Non-Repeating (XOR of array where all appear twice except one)
  1: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    let ans = 0;
    for (let i = 1; i <= n; i++) ans ^= tokens[i];
    return String(ans);
  },
  // 2: Number of 1 Bits Hamming
  2: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    let count = 0;
    let temp = n;
    while (temp > 0n) {
      if ((temp & 1n) === 1n) count++;
      temp >>= 1n;
    }
    return String(count);
  },
  // 3: Counting Bits DP
  3: (input) => {
    const n = parseInt(input.trim().split(/\s+/)[0], 10);
    const res: number[] = [];
    for (let i = 0; i <= n; i++) {
      let c = 0, t = i;
      while (t > 0) { c += (t & 1); t >>= 1; }
      res.push(c);
    }
    return res.join(' ');
  },
  // 4: Reverse Bits 32-bit
  4: (input) => {
    let n = BigInt(input.trim().split(/\s+/)[0]);
    let ans = 0n;
    for (let i = 0n; i < 32n; i++) {
      ans = (ans << 1n) | ((n >> i) & 1n);
    }
    return ans.toString();
  },
  // 5: Bitwise AND of Numbers Range [m, n]
  5: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    let m = tokens[0], n = tokens[1];
    let shift = 0n;
    while (m < n) {
      m >>= 1n;
      n >>= 1n;
      shift++;
    }
    return (m << shift).toString();
  },
  // 6: Single Number Non-Repeating (Variant 1: Thrice except one)
  6: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    let ones = 0, twos = 0;
    for (let i = 1; i <= n; i++) {
      const x = tokens[i];
      ones = (ones ^ x) & ~twos;
      twos = (twos ^ x) & ~ones;
    }
    return String(ones);
  },
  // 7: Two Non-Repeating Elements (Single Number III)
  7: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    let xorAll = 0;
    for (let i = 1; i <= n; i++) xorAll ^= tokens[i];
    const diff = xorAll & -xorAll;
    let a = 0, b = 0;
    for (let i = 1; i <= n; i++) {
      if ((tokens[i] & diff) !== 0) a ^= tokens[i];
      else b ^= tokens[i];
    }
    const [minV, maxV] = a < b ? [a, b] : [b, a];
    return `${minV} ${maxV}`;
  },
  // 8: Power of Two Check
  8: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n > 0n && (n & (n - 1n)) === 0n) ? 'YES' : 'NO';
  },
  // 9: Check if K-th Bit is Set
  9: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = tokens[0], k = tokens[1];
    return ((n >> k) & 1n) === 1n ? 'SET' : 'NOT SET';
  },
  // 10: Hamming Distance Between Two Integers
  10: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    let xorVal = tokens[0] ^ tokens[1];
    let count = 0;
    while (xorVal > 0n) {
      count += Number(xorVal & 1n);
      xorVal >>= 1n;
    }
    return String(count);
  },
  // 11: Swap Odd and Even Bits (32-bit)
  11: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const evenMask = 0xAAAAAAAAAAAAAAAAn & 0xFFFFFFFFn;
    const oddMask = 0x5555555555555555n & 0xFFFFFFFFn;
    const ans = ((n & evenMask) >> 1n) | ((n & oddMask) << 1n);
    return ans.toString();
  },
  // 12: Find Position of Only Set Bit
  12: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n <= 0n || (n & (n - 1n)) !== 0n) return '-1';
    let pos = 1;
    let t = n;
    while ((t & 1n) === 0n) {
      t >>= 1n;
      pos++;
    }
    return String(pos);
  },
  // 14: Find Missing Number in Array [0..N]
  14: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    let xorAll = 0;
    for (let i = 0; i <= n; i++) xorAll ^= i;
    for (let i = 1; i <= n; i++) xorAll ^= tokens[i];
    return String(xorAll);
  },
  // 16: Toggle K-th Bit
  16: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = tokens[0], k = tokens[1];
    return (n ^ (1n << k)).toString();
  },
  // 17: Clear the Rightmost Set Bit
  17: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n & (n - 1n)).toString();
  },
  // 18: Isolate Rightmost Set Bit
  18: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n & -n).toString();
  },
  // 19: Minimum Bit Flips to Convert Number
  19: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    let x = tokens[0] ^ tokens[1];
    let c = 0;
    while (x > 0n) { c += Number(x & 1n); x >>= 1n; }
    return String(c);
  },
  // 20: XOR of Numbers from 1 to N
  20: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const rem = n % 4n;
    if (rem === 0n) return n.toString();
    if (rem === 1n) return '1';
    if (rem === 2n) return (n + 1n).toString();
    return '0';
  },
};

async function testAll() {
  console.log('Testing Reference Solvers against Test Cases in Topic 19:');
  for (const [orderStr, solver] of Object.entries(solvers)) {
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

testAll();

