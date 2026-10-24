import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

// Map of reference solvers for candidate problems
const solvers: Record<number, (input: string) => string> = {
  1: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    let ans = 0;
    for (let i = 1; i <= tokens[0]; i++) ans ^= tokens[i];
    return String(ans);
  },
  2: (input) => {
    let n = BigInt(input.trim().split(/\s+/)[0]);
    let c = 0;
    while (n > 0n) { c += Number(n & 1n); n >>= 1n; }
    return String(c);
  },
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
  4: (input) => {
    let n = BigInt(input.trim().split(/\s+/)[0]);
    let ans = 0n;
    for (let i = 0n; i < 32n; i++) ans = (ans << 1n) | ((n >> i) & 1n);
    return ans.toString();
  },
  5: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    let m = tokens[0], n = tokens[1], shift = 0n;
    while (m < n) { m >>= 1n; n >>= 1n; shift++; }
    return (m << shift).toString();
  },
  6: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    let ones = 0, twos = 0;
    for (let i = 1; i <= tokens[0]; i++) {
      const x = tokens[i];
      ones = (ones ^ x) & ~twos;
      twos = (twos ^ x) & ~ones;
    }
    return String(ones);
  },
  7: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    let xorAll = 0;
    for (let i = 1; i <= tokens[0]; i++) xorAll ^= tokens[i];
    const diff = xorAll & -xorAll;
    let a = 0, b = 0;
    for (let i = 1; i <= tokens[0]; i++) {
      if ((tokens[i] & diff) !== 0) a ^= tokens[i];
      else b ^= tokens[i];
    }
    const [minV, maxV] = a < b ? [a, b] : [b, a];
    return `${minV} ${maxV}`;
  },
  8: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n > 0n && (n & (n - 1n)) === 0n) ? 'YES' : 'NO';
  },
  9: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    return ((tokens[0] >> tokens[1]) & 1n) === 1n ? 'SET' : 'NOT SET';
  },
  10: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    let x = tokens[0] ^ tokens[1], c = 0;
    while (x > 0n) { c += Number(x & 1n); x >>= 1n; }
    return String(c);
  },
  11: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const evenMask = 0xAAAAAAAAAAAAAAAAn & 0xFFFFFFFFn;
    const oddMask = 0x5555555555555555n & 0xFFFFFFFFn;
    return (((n & evenMask) >> 1n) | ((n & oddMask) << 1n)).toString();
  },
  12: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n <= 0n || (n & (n - 1n)) !== 0n) return '-1';
    let pos = 1, t = n;
    while ((t & 1n) === 0n) { t >>= 1n; pos++; }
    return String(pos);
  },
  13: (input) => {
    // Generate all subsets: array size N
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    const arr = tokens.slice(1, n + 1);
    const total = 1 << n;
    const lines: string[] = [];
    for (let mask = 0; mask < total; mask++) {
      const sub: number[] = [];
      for (let i = 0; i < n; i++) {
        if ((mask & (1 << i)) !== 0) sub.push(arr[i]);
      }
      lines.push(sub.join(' '));
    }
    return lines.join('\n');
  },
  14: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    let ans = 0;
    for (let i = 0; i <= n; i++) ans ^= i;
    for (let i = 1; i <= n; i++) ans ^= tokens[i];
    return String(ans);
  },
  15: (input) => {
    // Count total set bits from 1 to N
    let n = BigInt(input.trim().split(/\s+/)[0]);
    let count = 0n;
    let i = 1n;
    while (i <= n) {
      const totalPairs = (n + 1n) / (i * 2n);
      count += totalPairs * i;
      const rem = (n + 1n) % (i * 2n);
      if (rem > i) count += rem - i;
      i *= 2n;
    }
    return count.toString();
  },
  16: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    return (tokens[0] ^ (1n << tokens[1])).toString();
  },
  17: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n & (n - 1n)).toString();
  },
  18: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n & -n).toString();
  },
  20: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const rem = n % 4n;
    if (rem === 0n) return n.toString();
    if (rem === 1n) return '1';
    if (rem === 2n) return (n + 1n).toString();
    return '0';
  },
  21: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const s = n.toString(2);
    return s === s.split('').reverse().join('') ? 'YES' : 'NO';
  },
  22: (input) => {
    const n = parseInt(input.trim().split(/\s+/)[0], 10);
    const res: number[] = [];
    for (let i = 0; i < (1 << n); i++) res.push(i ^ (i >> 1));
    return res.join(' ');
  },
  23: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n ^ (n >> 1n)).toString();
  },
  24: (input) => {
    let n = BigInt(input.trim().split(/\s+/)[0]), bin = 0n;
    while (n > 0n) { bin ^= n; n >>= 1n; }
    return bin.toString();
  },
  25: (input) => {
    // Two Missing Numbers in 1 to N
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0];
    const arr = tokens.slice(1, n - 1);
    let xorAll = 0;
    for (let i = 1; i <= n; i++) xorAll ^= i;
    for (const x of arr) xorAll ^= x;
    const diff = xorAll & -xorAll;
    let a = 0, b = 0;
    for (let i = 1; i <= n; i++) {
      if ((i & diff) !== 0) a ^= i;
      else b ^= i;
    }
    for (const x of arr) {
      if ((x & diff) !== 0) a ^= x;
      else b ^= x;
    }
    const [minV, maxV] = a < b ? [a, b] : [b, a];
    return `${minV} ${maxV}`;
  },
  26: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    return (n | (n + 1n)).toString();
  },
  27: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    const s = n.toString(2);
    for (let i = 1; i < s.length; i++) if (s[i] === s[i - 1]) return 'NO';
    return 'YES';
  },
  28: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n === 0n) return '32';
    let c = 0, t = n;
    while ((t & 1n) === 0n) { c++; t >>= 1n; }
    return String(c);
  },
  29: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n === 0n) return '32';
    return String(32 - n.toString(2).length);
  },
  30: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const mask = ~((1n << (tokens[1] + 1n)) - 1n);
    return (tokens[0] & mask).toString();
  },
  31: (input) => {
    // Clear bits from MSB through K-th bit
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = tokens[0], k = tokens[1];
    const mask = (1n << k) - 1n;
    return (n & mask).toString();
  },
  33: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    return (tokens[0] * tokens[1]).toString();
  },
  34: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    return (tokens[0] + tokens[1]).toString();
  },
  35: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], arr = tokens.slice(1, n + 1);
    let maxV = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) maxV = Math.max(maxV, arr[i] ^ arr[j]);
    return String(maxV);
  },
  36: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = Number(tokens[0]), arr = tokens.slice(1, n + 1);
    let sum = 0n;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) sum += arr[i] ^ arr[j];
    return sum.toString();
  },
  37: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = Number(tokens[0]), arr = tokens.slice(1, n + 1);
    let sum = 0n;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) sum += arr[i] & arr[j];
    return sum.toString();
  },
  38: (input) => {
    const tokens = input.trim().split(/\s+/).map(BigInt);
    const n = Number(tokens[0]), arr = tokens.slice(1, n + 1);
    let sum = 0n;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) sum += arr[i] | arr[j];
    return sum.toString();
  },
  39: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], arr = tokens.slice(1, n + 1);
    let res = 0;
    for (let i = 0; i < n; i++) {
      const freq = (i + 1) * (n - i);
      if (freq % 2 === 1) res ^= arr[i];
    }
    return String(res);
  },
  40: (input) => {
    // Element occurring once (others K times)
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], k = tokens[1], arr = tokens.slice(2, 2 + n);
    const counts = new Map<number, number>();
    for (const x of arr) counts.set(x, (counts.get(x) || 0) + 1);
    for (const [x, c] of counts.entries()) if (c === 1) return String(x);
    return '0';
  },
  41: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    let maxC = 0, cur = 0;
    for (const ch of n.toString(2)) {
      if (ch === '1') { cur++; maxC = Math.max(maxC, cur); }
      else cur = 0;
    }
    return String(maxC);
  },
  42: (input) => {
    // Longest Subarray with Maximum AND
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], arr = tokens.slice(1, n + 1);
    const maxVal = Math.max(...arr);
    let maxLen = 0, cur = 0;
    for (const x of arr) {
      if (x === maxVal) { cur++; maxLen = Math.max(maxLen, cur); }
      else cur = 0;
    }
    return String(maxLen);
  },
  43: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    if (n <= 1n) return '1';
    let p = 1n;
    while (p < n) p <<= 1n;
    return p.toString();
  },
  44: (input) => {
    const n = BigInt(input.trim().split(/\s+/)[0]);
    let p = 1n;
    while ((p << 1n) <= n) p <<= 1n;
    return p.toString();
  },
  45: (input) => {
    // Count Distinct Bitwise ORs of Subarrays
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], arr = tokens.slice(1, n + 1);
    const allOrs = new Set<number>();
    let prev = new Set<number>();
    for (const x of arr) {
      const cur = new Set<number>([x]);
      for (const p of prev) cur.add(p | x);
      for (const val of cur) allOrs.add(val);
      prev = cur;
    }
    return String(allOrs.size);
  },
  48: (input) => {
    // Maximum XOR Subarray
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], arr = tokens.slice(1, n + 1);
    let maxV = 0;
    for (let i = 0; i < n; i++) {
      let cur = 0;
      for (let j = i; j < n; j++) {
        cur ^= arr[j];
        maxV = Math.max(maxV, cur);
      }
    }
    return String(maxV);
  },
  49: (input) => {
    // Subarrays with Given XOR Target
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], k = tokens[1], arr = tokens.slice(2, 2 + n);
    let count = 0, xor = 0;
    const freq = new Map<number, number>([[0, 1]]);
    for (const x of arr) {
      xor ^= x;
      count += freq.get(xor ^ k) || 0;
      freq.set(xor, (freq.get(xor) || 0) + 1);
    }
    return String(count);
  },
  57: (input) => {
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], arr = tokens.slice(1, n + 1);
    let orAll = 0;
    for (const x of arr) orAll |= x;
    return String(orAll * (1 << (n - 1)));
  },
  74: (input) => {
    // Chalkboard XOR Game: Alice / Bob
    const tokens = input.trim().split(/\s+/).map(Number);
    const n = tokens[0], arr = tokens.slice(1, n + 1);
    let xorAll = 0;
    for (const x of arr) xorAll ^= x;
    return (xorAll === 0 || n % 2 === 0) ? 'Alice' : 'Bob';
  }
};

async function verifyAllImplemented() {
  let passCount = 0;
  let failCount = 0;
  for (const [orderStr, solver] of Object.entries(solvers)) {
    const order = Number(orderStr);
    const id = `19-bit-manipulation-${String(order).padStart(3, '0')}`;
    const p = TOPIC_19_PROBLEMS[id];
    if (!p) continue;

    let passed = true;
    const tests = [...(p.visibleTests || []), ...(p.hiddenTests || [])];
    for (const t of tests) {
      const actual = solver(t.input).trim();
      const expected = t.expectedOutput.trim();
      if (actual !== expected) {
        console.log(`[#${order}] FAIL on ${t.id}: input="${t.input.trim()}" expected="${expected}" actual="${actual}"`);
        passed = false;
        break;
      }
    }
    if (passed) passCount++;
    else failCount++;
  }
  console.log(`\nVerified Solvers Result:`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
}

verifyAllImplemented();

