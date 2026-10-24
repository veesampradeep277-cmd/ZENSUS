import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { CodeRunner, CompilationResult, SingleExecutionResult } from './runner.interface';
import { getSanitizedEnv, MAX_OUTPUT_SIZE } from '../utils/security';
import { killProcessTree } from '../utils/process';

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
    static ListNode buildListNode(String s) {
        s = s.replace("[", "").replace("]", "").trim();
        if (s.isEmpty()) return null;
        String[] parts = s.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String p : parts) {
            p = p.trim();
            if (!p.isEmpty()) {
                curr.next = new ListNode(Integer.parseInt(p));
                curr = curr.next;
            }
        }
        return dummy.next;
    }

    static String serializeListNode(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        ListNode curr = head;
        boolean first = true;
        Set<ListNode> visited = new HashSet<>();
        while (curr != null && !visited.contains(curr)) {
            visited.add(curr);
            if (!first) sb.append(",");
            sb.append(curr.val);
            first = false;
            curr = curr.next;
        }
        sb.append("]");
        return sb.toString();
    }

    static TreeNode buildTreeNode(String s) {
        s = s.replace("[", "").replace("]", "").trim();
        if (s.isEmpty()) return null;
        String[] parts = s.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null") || parts[0].trim().isEmpty()) return null;
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            TreeNode node = q.poll();
            if (node != null) {
                if (i < parts.length) {
                    String leftVal = parts[i].trim();
                    if (!leftVal.equals("null") && !leftVal.isEmpty()) {
                        node.left = new TreeNode(Integer.parseInt(leftVal));
                        q.offer(node.left);
                    }
                }
                i++;
                if (i < parts.length) {
                    String rightVal = parts[i].trim();
                    if (!rightVal.equals("null") && !rightVal.isEmpty()) {
                        node.right = new TreeNode(Integer.parseInt(rightVal));
                        q.offer(node.right);
                    }
                }
                i++;
            }
        }
        return root;
    }

    static String serializeTreeNode(TreeNode root) {
        if (root == null) return "[]";
        List<String> list = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode n = q.poll();
            if (n != null) {
                list.add(String.valueOf(n.val));
                q.offer(n.left);
                q.offer(n.right);
            } else {
                list.add("null");
            }
        }
        while (!list.isEmpty() && list.get(list.size() - 1).equals("null")) {
            list.remove(list.size() - 1);
        }
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(list.get(i));
        }
        sb.append("]");
        return sb.toString();
    }

    static int[][] buildIntMatrix(String s) {
        s = s.trim();
        if (!s.startsWith("[") || !s.endsWith("]")) return new int[0][0];
        s = s.substring(1, s.length() - 1).trim();
        if (s.isEmpty()) return new int[0][0];
        List<int[]> rows = new ArrayList<>();
        int depth = 0;
        StringBuilder cur = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (depth == 0 && (c == ',' || Character.isWhitespace(c))) continue;
            if (c == '[') depth++;
            cur.append(c);
            if (c == ']') {
                depth--;
                if (depth == 0) {
                    String rowStr = cur.toString().replace("[", "").replace("]", "").trim();
                    if (rowStr.isEmpty()) {
                        rows.add(new int[0]);
                    } else {
                        String[] tokens = rowStr.split(",");
                        List<Integer> list = new ArrayList<>();
                        for (String t : tokens) {
                            t = t.trim();
                            if (!t.isEmpty()) list.add(Integer.parseInt(t));
                        }
                        int[] r = new int[list.size()];
                        for (int j = 0; j < list.size(); j++) r[j] = list.get(j);
                        rows.add(r);
                    }
                    cur = new StringBuilder();
                }
            }
        }
        int[][] res = new int[rows.size()][];
        for (int i = 0; i < rows.size(); i++) res[i] = rows.get(i);
        return res;
    }

    static char[][] buildCharMatrix(String s) {
        s = s.trim();
        if (!s.startsWith("[") || !s.endsWith("]")) return new char[0][0];
        s = s.substring(1, s.length() - 1).trim();
        if (s.isEmpty()) return new char[0][0];
        List<char[]> rows = new ArrayList<>();
        int depth = 0;
        StringBuilder cur = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (depth == 0 && (c == ',' || Character.isWhitespace(c))) continue;
            if (c == '[') depth++;
            cur.append(c);
            if (c == ']') {
                depth--;
                if (depth == 0) {
                    String rowStr = cur.toString().replace("[", "").replace("]", "").trim();
                    if (rowStr.isEmpty()) {
                        rows.add(new char[0]);
                    } else {
                        String[] tokens = rowStr.split(",");
                        List<Character> list = new ArrayList<>();
                        for (String t : tokens) {
                            t = t.trim().replace("\\"", "").replace("'", "");
                            if (!t.isEmpty()) list.add(t.charAt(0));
                        }
                        char[] r = new char[list.size()];
                        for (int j = 0; j < list.size(); j++) r[j] = list.get(j);
                        rows.add(r);
                    }
                    cur = new StringBuilder();
                }
            }
        }
        char[][] res = new char[rows.size()][];
        for (int i = 0; i < rows.size(); i++) res[i] = rows.get(i);
        return res;
    }

    static String serializeIntArray(int[] arr) {
        StringBuilder out = new StringBuilder("[");
        for (int j = 0; j < arr.length; j++) {
            if (j > 0) out.append(",");
            out.append(arr[j]);
        }
        out.append("]");
        return out.toString();
    }

    static String serializeIntMatrix(int[][] matrix) {
        StringBuilder out = new StringBuilder("[");
        for (int i = 0; i < matrix.length; i++) {
            if (i > 0) out.append(",");
            out.append(serializeIntArray(matrix[i]));
        }
        out.append("]");
        return out.toString();
    }

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
            } else if (pType == ListNode.class) {
                invokeArgs[i] = buildListNode(valStr);
            } else if (pType == TreeNode.class) {
                invokeArgs[i] = buildTreeNode(valStr);
            } else if (pType == int[][].class) {
                invokeArgs[i] = buildIntMatrix(valStr);
            } else if (pType == char[][].class) {
                invokeArgs[i] = buildCharMatrix(valStr);
            }
        }

        Object result = targetMethod.invoke(sol, invokeArgs);
        if (result != null) {
            if (result instanceof ListNode) {
                System.out.println(serializeListNode((ListNode) result));
            } else if (result instanceof TreeNode) {
                System.out.println(serializeTreeNode((TreeNode) result));
            } else if (result instanceof int[]) {
                System.out.println(serializeIntArray((int[]) result));
            } else if (result instanceof int[][]) {
                System.out.println(serializeIntMatrix((int[][]) result));
            } else if (result.getClass().isArray()) {
                System.out.println(Arrays.deepToString((Object[]) result));
            } else {
                System.out.println(result.toString());
            }
        } else {
            Class<?> returnType = targetMethod.getReturnType();
            if (returnType == ListNode.class || returnType == TreeNode.class) {
                System.out.println("[]");
            } else if (invokeArgs.length > 0 && invokeArgs[0] != null) {
                // In-place modification check
                Object first = invokeArgs[0];
                if (first instanceof ListNode) {
                    System.out.println(serializeListNode((ListNode) first));
                } else if (first instanceof TreeNode) {
                    System.out.println(serializeTreeNode((TreeNode) first));
                } else if (first instanceof int[]) {
                    System.out.println(serializeIntArray((int[]) first));
                } else if (first instanceof int[][]) {
                    System.out.println(serializeIntMatrix((int[][]) first));
                } else if (first.getClass().isArray()) {
                    System.out.println(Arrays.deepToString((Object[]) first));
                } else {
                    System.out.println(first.toString());
                }
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
      const proc = spawn('java', ['--version'], { env: getSanitizedEnv() });
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
