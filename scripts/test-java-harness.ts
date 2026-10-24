import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tmpDir = path.resolve('temp_inspect/java_test');
fs.mkdirSync(tmpDir, { recursive: true });

const studentCode = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[0];
    }
}
`;

const imports = `import java.io.*;
import java.util.*;
import java.lang.reflect.*;
`;

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

const fullJava = imports + '\n' + studentCode + '\n' + harness;
fs.writeFileSync(path.join(tmpDir, 'Main.java'), fullJava, 'utf8');

const comp = spawnSync('javac', ['Main.java'], { cwd: tmpDir });
console.log('Javac exit:', comp.status, 'Error:', comp.stderr.toString());

if (comp.status === 0) {
  const run = spawnSync('java', ['Main'], { cwd: tmpDir, input: 'nums = [2,7,11,15], target = 9' });
  console.log('Java run result:', run.stdout.toString(), 'Error:', run.stderr.toString());
}
