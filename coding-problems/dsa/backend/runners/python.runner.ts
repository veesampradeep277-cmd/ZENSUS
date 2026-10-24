import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { CodeRunner, SingleExecutionResult } from './runner.interface';
import { getSanitizedEnv, MAX_OUTPUT_SIZE } from '../utils/security';

function preparePythonCode(code: string): string {
  if (!code.includes('class Solution')) {
    return code;
  }
  const prelude = `from typing import *
import sys, json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
`;

  const harness = `
if __name__ == '__main__':
    try:
        if 'Solution' in globals():
            raw_input = sys.stdin.read().strip()
            if raw_input:
                sol = Solution()
                methods = [m for m in dir(sol) if not m.startswith('_')]
                if methods:
                    fn = getattr(sol, methods[0])
                    parts = []
                    cur = ''
                    depth = 0
                    in_quote = False
                    quote_char = ''
                    for line in raw_input.replace('\\r\\n', '\\n').split('\\n'):
                        line = line.strip()
                        if not line: continue
                        for ch in line:
                            if in_quote:
                                cur += ch
                                if ch == quote_char and (len(cur) < 2 or cur[-2] != '\\\\'):
                                    in_quote = False
                            elif ch in ('\"', \"'\"):
                                in_quote = True
                                quote_char = ch
                                cur += ch
                            elif ch in '([{':
                                depth += 1
                                cur += ch
                            elif ch in ')]}':
                                depth -= 1
                                cur += ch
                            elif ch == ',' and depth == 0:
                                if cur.strip(): parts.append(cur.strip())
                                cur = ''
                            else:
                                cur += ch
                        if cur.strip():
                            parts.append(cur.strip())
                            cur = ''
                    locs = {}
                    positional = []
                    for part in parts:
                        if '=' in part:
                            k, v = part.split('=', 1)
                            v = v.strip()
                            try:
                                val = json.loads(v)
                            except Exception:
                                try:
                                    val = eval(v, {}, {})
                                except Exception:
                                    val = v
                            locs[k.strip()] = val
                        else:
                            try:
                                val = json.loads(part)
                            except Exception:
                                try:
                                    val = eval(part, {}, {})
                                except Exception:
                                    val = part
                            positional.append(val)
                    if locs:
                        try:
                            res = fn(**locs)
                        except TypeError:
                            res = fn(*locs.values())
                    elif positional:
                        try:
                            res = fn(*positional)
                        except TypeError:
                            if len(positional) == 1:
                                res = fn(positional[0])
                            else:
                                raise
                    else:
                        try:
                            val = json.loads(raw_input)
                        except Exception:
                            val = raw_input
                        res = fn(val)
                    if res is not None:
                        if isinstance(res, (list, dict, bool)):
                            print(json.dumps(res))
                        else:
                            print(res)
                    else:
                        # In-place modification check
                        modified = None
                        if locs:
                            first_val = next(iter(locs.values()))
                            if isinstance(first_val, (list, dict)):
                                modified = first_val
                        elif positional and isinstance(positional[0], (list, dict)):
                            modified = positional[0]
                        if modified is not None:
                            print(json.dumps(modified))
    except Exception as e:
        import traceback
        traceback.print_exc()
        sys.exit(1)
`;
  return prelude + '\n' + code + '\n' + harness;
}

export class PythonRunner implements CodeRunner {
  language = 'python';
  private static cachedCmd: string | null = null;

  private async getPythonCommand(): Promise<string> {
    if (PythonRunner.cachedCmd) return PythonRunner.cachedCmd;
    const candidates = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python'];
    for (const cmd of candidates) {
      const ok = await new Promise<boolean>((resolve) => {
        const proc = spawn(cmd, ['--version']);
        proc.on('error', () => resolve(false));
        proc.on('close', (code) => resolve(code === 0));
      });
      if (ok) {
        PythonRunner.cachedCmd = cmd;
        return cmd;
      }
    }
    return process.platform === 'win32' ? 'python' : 'python3';
  }

  async checkAvailability(): Promise<{ available: boolean; version?: string; notes?: string }> {
    const cmd = await this.getPythonCommand();
    return new Promise((resolve) => {
      const proc = spawn(cmd, ['--version']);
      let out = '';
      proc.stdout.on('data', d => out += d.toString());
      proc.stderr.on('data', d => out += d.toString());
      proc.on('error', (err) => {
        resolve({ available: false, notes: `${cmd} not found: ${err.message}` });
      });
      proc.on('close', (code) => {
        if (code === 0) {
          resolve({ available: true, version: out.trim() || 'Python 3' });
        } else {
          resolve({ available: false, notes: `Exited with code ${code}` });
        }
      });
    });
  }

  async compile(workspacePath: string, code: string): Promise<{ success: boolean; compilationError?: string }> {
    const prepared = preparePythonCode(code);
    const scriptPath = path.join(workspacePath, 'solution.py');
    fs.writeFileSync(scriptPath, prepared, 'utf8');
    const cmd = await this.getPythonCommand();

    return new Promise((resolve) => {
      const child = spawn(cmd, ['-m', 'py_compile', scriptPath], {
        cwd: workspacePath,
        env: getSanitizedEnv(),
      });
      let stderr = '';
      child.stderr.on('data', d => stderr += d.toString());
      child.stdout.on('data', d => stderr += d.toString());

      child.on('error', (err) => {
        resolve({ success: false, compilationError: `Python execution error: ${err.message}` });
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            compilationError: stderr.trim() || 'SyntaxError: Invalid Python syntax',
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
    const prepared = preparePythonCode(code);
    const scriptPath = path.join(workspacePath, 'solution.py');
    fs.writeFileSync(scriptPath, prepared, 'utf8');
    const cmd = await this.getPythonCommand();

    return new Promise((resolve) => {
      const startTime = process.hrtime.bigint();
      let timedOut = false;
      let stdout = '';
      let stderr = '';

      const child = spawn(cmd, [scriptPath], {
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

      // Write input to child stdin
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
