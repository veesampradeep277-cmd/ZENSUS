import { PythonRunner } from '../backend/runners/python.runner';
import { JavaScriptRunner } from '../backend/runners/js.runner';
import { createTempWorkspace, cleanupTempWorkspace } from '../backend/utils/temp-files';

async function testHarness() {
  console.log('Testing Python and JS runners with LeetCode solutions...');

  // Python test
  const pyRunner = new PythonRunner();
  const pyWs = createTempWorkspace();
  const pyCode = `
from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, x in enumerate(nums):
            if target - x in seen:
                return [seen[target - x], i]
            seen[x] = i

# Harness
import json, sys

if __name__ == '__main__':
    sol = Solution()
    input_data = sys.stdin.read().strip()
    # input_data: nums = [2,7,11,15], target = 9
    locs = {}
    for line in ['nums = [2,7,11,15]', 'target = 9']:
        exec(line, {}, locs)
    res = sol.twoSum(**locs)
    print(json.dumps(res))
`;

  try {
    const res = await pyRunner.execute(pyWs, pyCode, '', 5000);
    console.log('Python execute result:', res);
  } finally {
    cleanupTempWorkspace(pyWs);
  }

  // JS test
  const jsRunner = new JavaScriptRunner();
  const jsWs = createTempWorkspace();
  const jsCode = `
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
};

// Harness
const nums = [2,7,11,15];
const target = 9;
console.log(JSON.stringify(twoSum(nums, target)));
`;

  try {
    const res = await jsRunner.execute(jsWs, jsCode, '', 5000);
    console.log('JS execute result:', res);
  } finally {
    cleanupTempWorkspace(jsWs);
  }
}

testHarness().catch(console.error);
