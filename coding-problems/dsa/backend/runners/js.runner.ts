import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { CodeRunner, SingleExecutionResult } from './runner.interface';
import { getSanitizedEnv, MAX_OUTPUT_SIZE } from '../utils/security';

function prepareJsCode(code: string): string {
  if (code.includes('process.stdin') || code.includes('fs.readFileSync(0') || code.includes('readline')) {
    return code;
  }

  const prelude = `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}
`;

  // Detect function name or class Solution
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
  return prelude + '\n' + code + '\n' + harness;
}

export class JavaScriptRunner implements CodeRunner {
  language = 'javascript';

  async checkAvailability(): Promise<{ available: boolean; version?: string; notes?: string }> {
    return new Promise((resolve) => {
      const proc = spawn('node', ['--version']);
      let out = '';
      proc.stdout.on('data', d => out += d.toString());
      proc.stderr.on('data', d => out += d.toString());
      proc.on('error', (err) => {
        resolve({ available: false, notes: `Node.js runtime not found: ${err.message}` });
      });
      proc.on('close', (code) => {
        if (code === 0) {
          resolve({ available: true, version: out.trim() || 'Node.js' });
        } else {
          resolve({ available: false, notes: `node --version exited with code ${code}` });
        }
      });
    });
  }

  async compile(workspacePath: string, code: string): Promise<{ success: boolean; compilationError?: string }> {
    const runnableCode = prepareJsCode(code);
    const scriptPath = path.join(workspacePath, 'solution.js');
    fs.writeFileSync(scriptPath, runnableCode, 'utf8');

    return new Promise((resolve) => {
      const child = spawn('node', ['--check', scriptPath], {
        cwd: workspacePath,
        env: getSanitizedEnv(),
      });
      let stderr = '';
      child.stderr.on('data', d => stderr += d.toString());

      child.on('error', (err) => {
        resolve({ success: false, compilationError: `Node.js check error: ${err.message}` });
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            compilationError: stderr.trim() || 'SyntaxError: Invalid JavaScript syntax',
          });
        }
      });
    });
  }

  async execute(
    workspacePath: string,
    code: string,
    input: string,
    timeLimitMs: number
  ): Promise<SingleExecutionResult> {
    const runnableCode = prepareJsCode(code);
    const scriptPath = path.join(workspacePath, 'solution.js');
    fs.writeFileSync(scriptPath, runnableCode, 'utf8');

    return new Promise((resolve) => {
      const startTime = process.hrtime.bigint();
      let timedOut = false;
      let stdout = '';
      let stderr = '';

      const child = spawn('node', ['--max-old-space-size=256', scriptPath], {
        cwd: workspacePath,
        env: getSanitizedEnv(),
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const timer = setTimeout(() => {
        timedOut = true;
        child.kill('SIGKILL');
      }, timeLimitMs);

      child.stdout.on('data', (data) => {
        if (stdout.length < MAX_OUTPUT_SIZE) {
          stdout += data.toString();
        }
      });

      child.stderr.on('data', (data) => {
        if (stderr.length < MAX_OUTPUT_SIZE) {
          stderr += data.toString();
        }
      });

      if (input) {
        child.stdin.write(input);
      }
      child.stdin.end();

      child.on('error', (err) => {
        clearTimeout(timer);
        const duration = Number(process.hrtime.bigint() - startTime) / 1e6;
        resolve({
          stdout,
          stderr: err.message,
          exitCode: 1,
          runtimeMs: Math.round(duration),
          timedOut: false,
          verdict: 'RUNTIME_ERROR',
          errorMessage: err.message,
        });
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        const duration = Number(process.hrtime.bigint() - startTime) / 1e6;
        const runtimeMs = Math.round(duration);

        if (timedOut) {
          return resolve({
            stdout,
            stderr: 'Time Limit Exceeded (execution exceeded ' + timeLimitMs + 'ms)',
            exitCode: null,
            runtimeMs: timeLimitMs,
            timedOut: true,
            verdict: 'TIME_LIMIT_EXCEEDED',
            errorMessage: 'Time Limit Exceeded',
          });
        }

        if (code !== 0) {
          return resolve({
            stdout,
            stderr,
            exitCode: code,
            runtimeMs,
            timedOut: false,
            verdict: 'RUNTIME_ERROR',
            errorMessage: stderr.trim() || `Process exited with error code ${code}`,
          });
        }

        resolve({
          stdout,
          stderr,
          exitCode: 0,
          runtimeMs,
          timedOut: false,
          verdict: 'ACCEPTED',
        });
      });
    });
  }
}
