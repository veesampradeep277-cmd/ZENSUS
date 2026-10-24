import { spawnSync } from 'child_process';

export function prepareJsCode(code: string): string {
  if (code.includes('process.stdin') || code.includes('fs.readFileSync(0')) {
    return code;
  }

  // Extract function name or class Solution
  const varFnMatch = code.match(/(?:var|let|const|function)\s+([a-zA-Z0-9_$]+)\s*(?:=\s*function|\()/);
  const fnName = varFnMatch ? varFnMatch[1] : null;

  const harness = `
;(() => {
  try {
    const fs = require('fs');
    const raw = fs.readFileSync(0, 'utf8').trim();
    if (!raw) return;

    function parseInput(text) {
      const parts = [];
      let cur = '';
      let depth = 0;
      let inQuote = false;
      let quoteChar = '';
      for (const line of text.replace(/\\r\\n/g, '\\n').split('\\n')) {
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
      const positional = [];
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
        } else {
          try {
            positional.push(JSON.parse(p));
          } catch {
            try { positional.push(eval('(' + p + ')')); } catch { positional.push(p); }
          }
        }
      }
      return { locs, positional };
    }

    const { locs, positional } = parseInput(raw);
    let fn = null;

    ${fnName ? `if (typeof ${fnName} === 'function') { fn = ${fnName}; }` : ''}

    if (!fn && typeof Solution !== 'undefined') {
      const sol = new Solution();
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(sol)).filter(m => m !== 'constructor');
      if (methods.length > 0) {
        fn = sol[methods[0]].bind(sol);
      }
    }

    if (!fn) return;

    // Get param names of fn
    const fnStr = fn.toString();
    const paramMatch = fnStr.match(/^[^(]*\\(([^)]*)\\)/);
    const paramNames = paramMatch ? paramMatch[1].split(',').map(s => s.trim()).filter(Boolean) : [];

    let args = [];
    if (paramNames.length > 0 && Object.keys(locs).length > 0) {
      args = paramNames.map(name => locs[name]);
    } else if (positional.length > 0) {
      args = positional;
    } else {
      args = Object.values(locs);
    }

    const res = fn(...args);
    if (res !== undefined) {
      if (typeof res === 'object' || typeof res === 'boolean') {
        console.log(JSON.stringify(res));
      } else {
        console.log(res);
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
`;
  return code + '\n' + harness;
}

const sol = 'var twoSum = function(nums, target) { const m = new Map(); for (let i = 0; i < nums.length; i++) { const diff = target - nums[i]; if (m.has(diff)) return [m.get(diff), i]; m.set(nums[i], i); } return []; };';
const full = prepareJsCode(sol);
const res = spawnSync('node', ['-e', full], { input: 'nums = [2,7,11,15], target = 9' });
console.log('Result:', res.stdout.toString(), 'Error:', res.stderr.toString());
