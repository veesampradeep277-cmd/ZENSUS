import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function prepareJs(code: string): string {
  // Extract function name if var fn = function or function fn(...)
  const fnMatch = code.match(/(?:var|let|const)\s+([a-zA-Z0-9_$]+)\s*=\s*function/i) ||
                  code.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/i);
  const fnName = fnMatch ? fnMatch[1] : null;

  if (!fnName && !code.includes('class Solution')) {
    return code;
  }

  const harness = `
// --- ZENSUS Harness ---
try {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf8').trim();
  if (raw) {
    const parts = [];
    let cur = '';
    let depth = 0;
    let inQuote = false;
    let quoteChar = '';
    for (const line of raw.replace(/\\r\\n/g, '\\n').split('\\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      for (let i = 0; i < trimmed.length; i++) {
        const ch = trimmed[i];
        if (inQuote) {
          cur += ch;
          if (ch === quoteChar && (cur.length < 2 || cur[cur.length - 2] !== '\\\\')) inQuote = false;
        } else if (ch === '"' || ch === "'") {
          inQuote = true;
          quoteChar = ch;
          cur += ch;
        } else if (ch === '[' || ch === '(' || ch === '{') {
          depth++;
          cur += ch;
        } else if (ch === ']' || ch === ')' || ch === '}') {
          depth--;
          cur += ch;
        } else if (ch === ',' && depth === 0) {
          if (cur.trim()) parts.push(cur.trim());
          cur = '';
        } else {
          cur += ch;
        }
      }
      if (cur.trim()) {
        parts.push(cur.trim());
        cur = '';
      }
    }
    const locs = {};
    for (const p of parts) {
      if (p.includes('=')) {
        const idx = p.indexOf('=');
        const k = p.slice(0, idx).trim();
        const v = p.slice(idx + 1).trim();
        try {
          locs[k] = JSON.parse(v);
        } catch {
          try { locs[k] = eval('(' + v + ')'); } catch { locs[k] = v; }
        }
      }
    }

    let res;
    ${fnName ? `
    if (typeof ${fnName} === 'function') {
      const keys = Object.keys(locs);
      if (keys.length > 0) {
        // Pass values of locs
        const args = keys.map(k => locs[k]);
        res = ${fnName}(...args);
      } else {
        res = ${fnName}(JSON.parse(raw));
      }
    }
    ` : `
    if (typeof Solution === 'function') {
      const sol = new Solution();
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(sol)).filter(m => m !== 'constructor');
      if (methods.length > 0) {
        const keys = Object.keys(locs);
        const args = keys.map(k => locs[k]);
        res = sol[methods[0]](...args);
      }
    }
    `}

    if (res !== undefined) {
      console.log(JSON.stringify(res));
    }
  }
} catch(err) {
  console.error(err);
  process.exit(1);
}
`;

  return code + '\n' + harness;
}

const studentCode = `
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
};
`;

const prepared = prepareJs(studentCode);
const res = spawnSync('node', ['-e', prepared], { input: 'nums = [2,7,11,15], target = 9' });
console.log('Node run result:', res.stdout.toString(), res.stderr.toString());
