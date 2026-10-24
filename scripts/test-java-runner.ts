import fs from 'fs';
import { JavaRunner } from '../backend/runners/java.runner';
import { createTempWorkspace, cleanupTempWorkspace } from '../backend/utils/temp-files';

async function testJava() {
  const runner = new JavaRunner();
  const ws = createTempWorkspace();

  const javaCode = `
import java.util.*;
import java.io.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] res = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(res));
    }
}
`;

  try {
    const res = await runner.execute(ws, javaCode, '', 5000);
    console.log('Java execution result:', res);
  } finally {
    cleanupTempWorkspace(ws);
  }
}

testJava().catch(console.error);
