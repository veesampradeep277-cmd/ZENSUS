import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { CodeRunner, CompilationResult, SingleExecutionResult } from './runner.interface';
import { getSanitizedEnv, MAX_OUTPUT_SIZE } from '../utils/security';

function prepareJavaCode(code: string): string {
  if (code.includes('public class Main') || code.includes('public static void main')) {
    return code;
  }

  const prelude = `
import java.io.*;
import java.util.*;
import java.lang.reflect.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
`;

  let safeCode = code.replace(/public\s+class\s+Solution/g, 'class Solution');

  const harness = `
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line).append("\\n");
        }
        String input = sb.toString().trim();
        if (input.isEmpty()) return;

        Solution sol = new Solution();
        Method targetMethod = null;
        for (Method m : Solution.class.getDeclaredMethods()) {
            if (!Modifier.isStatic(m.getModifiers()) && Modifier.isPublic(m.getModifiers())) {
                targetMethod = m;
                break;
            }
        }
        if (targetMethod == null) return;

        Class<?>[] paramTypes = targetMethod.getParameterTypes();
        Object[] invokeArgs = new Object[paramTypes.length];

        List<String> rawParts = new ArrayList<>();
        int depth = 0;
        boolean inQuote = false;
        StringBuilder cur = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);
            if (ch == '"' || ch == '\\'') {
                inQuote = !inQuote;
                cur.append(ch);
            } else if (!inQuote && (ch == '[' || ch == '(' || ch == '{')) {
                depth++;
                cur.append(ch);
            } else if (!inQuote && (ch == ']' || ch == ')' || ch == '}')) {
                depth--;
                cur.append(ch);
            } else if (!inQuote && (ch == ',' || ch == '\\n') && depth == 0) {
                if (cur.toString().trim().length() > 0) rawParts.add(cur.toString().trim());
                cur = new StringBuilder();
            } else {
                cur.append(ch);
            }
        }
        if (cur.toString().trim().length() > 0) rawParts.add(cur.toString().trim());

        List<String> valList = new ArrayList<>();
        for (String p : rawParts) {
            if (p.contains("=")) {
                String[] s = p.split("=", 2);
                valList.add(s[1].trim());
            } else {
                valList.add(p.trim());
            }
        }

        for (int i = 0; i < paramTypes.length && i < valList.size(); i++) {
            Class<?> pType = paramTypes[i];
            String valStr = valList.get(i);
            if (pType == int.class || pType == Integer.class) {
                invokeArgs[i] = Integer.parseInt(valStr);
            } else if (pType == long.class || pType == Long.class) {
                invokeArgs[i] = Long.parseLong(valStr);
            } else if (pType == double.class || pType == Double.class) {
                invokeArgs[i] = Double.parseDouble(valStr);
            } else if (pType == boolean.class || pType == Boolean.class) {
                invokeArgs[i] = Boolean.parseBoolean(valStr);
            } else if (pType == String.class) {
                if (valStr.startsWith("\\"") && valStr.endsWith("\\"") && valStr.length() >= 2) {
                    invokeArgs[i] = valStr.substring(1, valStr.length() - 1);
                } else {
                    invokeArgs[i] = valStr;
                }
            } else if (pType == int[].class) {
                String clean = valStr.replace("[", "").replace("]", "").trim();
                if (clean.isEmpty()) {
                    invokeArgs[i] = new int[0];
                } else {
                    String[] tokens = clean.split(",");
                    int[] arr = new int[tokens.length];
                    for (int j = 0; j < tokens.length; j++) arr[j] = Integer.parseInt(tokens[j].trim());
                    invokeArgs[i] = arr;
                }
            } else if (pType == String[].class) {
                String clean = valStr.replace("[", "").replace("]", "").trim();
                if (clean.isEmpty()) {
                    invokeArgs[i] = new String[0];
                } else {
                    String[] tokens = clean.split(",");
                    String[] arr = new String[tokens.length];
                    for (int j = 0; j < tokens.length; j++) {
                        String t = tokens[j].trim();
                        if (t.startsWith("\\"") && t.endsWith("\\"") && t.length() >= 2) t = t.substring(1, t.length() - 1);
                        arr[j] = t;
                    }
                    invokeArgs[i] = arr;
                }
            }
        }

        Object result = targetMethod.invoke(sol, invokeArgs);
        if (result != null) {
            if (result instanceof int[]) {
                int[] arr = (int[]) result;
                StringBuilder out = new StringBuilder("[");
                for (int j = 0; j < arr.length; j++) {
                    if (j > 0) out.append(",");
                    out.append(arr[j]);
                }
                out.append("]");
                System.out.println(out.toString());
            } else if (result.getClass().isArray()) {
                System.out.println(Arrays.deepToString((Object[]) result));
            } else {
                System.out.println(result.toString());
            }
        }
    }
}
`;

  return prelude + '\n' + safeCode + '\n' + harness;
}

export class JavaRunner implements CodeRunner {
  language = 'java';

  async checkAvailability(): Promise<{ available: boolean; version?: string; notes?: string }> {
    return new Promise((resolve) => {
      const proc = spawn('java', ['--version']);
      let out = '';
      proc.stdout.on('data', d => out += d.toString());
      proc.stderr.on('data', d => out += d.toString());
      proc.on('error', (err) => {
        resolve({ available: false, notes: `Java runtime not found: ${err.message}` });
      });
      proc.on('close', (code) => {
        if (code === 0) {
          const firstLine = out.split('\n')[0] || 'Java';
          resolve({ available: true, version: firstLine.trim() });
        } else {
          resolve({ available: false, notes: `java --version exited with code ${code}` });
        }
      });
    });
  }

  async compile(workspacePath: string, code: string): Promise<CompilationResult> {
    const runnableCode = prepareJavaCode(code);
    const srcPath = path.join(workspacePath, 'Main.java');
    const classPath = path.join(workspacePath, 'Main.class');
    fs.writeFileSync(srcPath, runnableCode, 'utf8');

    return new Promise((resolve) => {
      let stderr = '';
      const child = spawn('javac', ['Main.java'], {
        cwd: workspacePath,
        env: getSanitizedEnv(),
      });

      child.stderr.on('data', d => stderr += d.toString());

      child.on('error', (err) => {
        resolve({ success: false, compilationError: `javac invocation error: ${err.message}` });
      });

      child.on('close', (code) => {
        if (code === 0 && fs.existsSync(classPath)) {
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            compilationError: stderr.trim() || `Java compilation failed with exit code ${code}`,
          });
        }
      });
    });
  }

  async execute(
    workspacePath: string,
    code: string,
    input: string,
    timeLimitMs: number,
    isPrecompiled: boolean = false
  ): Promise<SingleExecutionResult> {
    if (!isPrecompiled) {
      const comp = await this.compile(workspacePath, code);
      if (!comp.success) {
        return {
          stdout: '',
          stderr: comp.compilationError || 'Compilation Error',
          exitCode: 1,
          runtimeMs: 0,
          timedOut: false,
          verdict: 'COMPILATION_ERROR',
          errorMessage: comp.compilationError,
        };
      }
    }

    return new Promise((resolve) => {
      const startTime = process.hrtime.bigint();
      let timedOut = false;
      let stdout = '';
      let stderr = '';

      const child = spawn('java', ['-Xmx256m', '-cp', workspacePath, 'Main'], {
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
