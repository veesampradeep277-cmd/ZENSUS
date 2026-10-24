import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { CodeRunner, SingleExecutionResult } from './runner.interface';
import { getSanitizedEnv, MAX_OUTPUT_SIZE } from '../utils/security';
import { killProcessTree } from '../utils/process';

function preparePythonCode(code: string): string {
  if (!code.includes('class Solution')) {
    return code;
  }
  const prelude = `from typing import *
import sys, json, inspect

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def _build_list_node(arr):
    if not isinstance(arr, list) or not arr:
        return None
    dummy = ListNode(0)
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def _serialize_list_node(head):
    res = []
    curr = head
    visited = set()
    while curr and id(curr) not in visited and len(res) < 10000:
        visited.add(id(curr))
        res.append(curr.val)
        curr = curr.next
    return res

def _build_tree_node(arr):
    if not isinstance(arr, list) or not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if node is not None:
            if i < len(arr) and arr[i] is not None:
                node.left = TreeNode(arr[i])
                queue.append(node.left)
            i += 1
            if i < len(arr) and arr[i] is not None:
                node.right = TreeNode(arr[i])
                queue.append(node.right)
            i += 1
    return root

def _serialize_tree_node(root):
    if not root:
        return []
    res = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            res.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

def _convert_arg(val, param_name, annotation):
    anno_str = str(annotation).lower()
    p_name = param_name.lower()
    if isinstance(val, list):
        if 'listnode' in anno_str or p_name in ('head', 'list1', 'list2', 'l1', 'l2'):
            return _build_list_node(val)
        if 'treenode' in anno_str or p_name in ('root', 'p', 'q', 'node', 't1', 't2'):
            return _build_tree_node(val)
    return val
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

                    sig = None
                    try:
                        sig = inspect.signature(fn)
                    except Exception:
                        pass

                    if sig:
                        param_items = list(sig.parameters.items())
                        # If positional, convert according to sig params
                        if positional and not locs:
                            new_pos = []
                            for idx, val in enumerate(positional):
                                if idx < len(param_items):
                                    p_name, p_param = param_items[idx]
                                    new_pos.append(_convert_arg(val, p_name, p_param.annotation))
                                else:
                                    new_pos.append(val)
                            positional = new_pos
                        # If locs, convert according to sig params
                        elif locs:
                            new_locs = {}
                            for p_name, val in locs.items():
                                if p_name in sig.parameters:
                                    new_locs[p_name] = _convert_arg(val, p_name, sig.parameters[p_name].annotation)
                                else:
                                    new_locs[p_name] = val
                            locs = new_locs

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
                        if isinstance(res, ListNode):
                            print(json.dumps(_serialize_list_node(res)))
                        elif isinstance(res, TreeNode):
                            print(json.dumps(_serialize_tree_node(res)))
                        elif isinstance(res, (list, dict, bool)):
                            print(json.dumps(res))
                        else:
                            print(res)
                    else:
                        ret_anno = str(getattr(sig, 'return_annotation', '')).lower() if sig else ''
                        if 'listnode' in ret_anno:
                            print('[]')
                        elif 'treenode' in ret_anno:
                            print('[]')
                        else:
                            # In-place modification check
                            modified = None
                            if locs:
                                modified = next(iter(locs.values()))
                            elif positional:
                                modified = positional[0]
                            if modified is not None:
                                if isinstance(modified, ListNode):
                                    print(json.dumps(_serialize_list_node(modified)))
                                elif isinstance(modified, TreeNode):
                                    print(json.dumps(_serialize_tree_node(modified)))
                                elif isinstance(modified, (list, dict)):
                                    print(json.dumps(modified))
                                else:
                                    print(modified)
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
        const proc = spawn(cmd, ['--version'], { env: getSanitizedEnv() });
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
      const proc = spawn(cmd, ['--version'], { env: getSanitizedEnv() });
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
        killProcessTree(child);
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
