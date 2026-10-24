async function testApi() {
  console.log('--- Testing API via HTTP Endpoints ---');
  const BASE = 'http://localhost:3000';
  
  // 1. Health
  const healthRes = await fetch(`${BASE}/api/health`);
  const health = await healthRes.json();
  console.log('1. Health check:', health.status === 'ok' ? 'PASS' : 'FAIL', health.service);
  if (health.status !== 'ok') throw new Error('Health check failed');

  // 2. DSA diagnostic
  const dsaRes = await fetch(`${BASE}/api/dsa`);
  const dsa = await dsaRes.json();
  console.log('2. /api/dsa root:', dsa.status === 'ok' ? 'PASS' : 'FAIL', dsa.service);
  if (dsa.status !== 'ok') throw new Error('/api/dsa failed');

  // 3. Topics list
  const topicsRes = await fetch(`${BASE}/api/dsa/topics`);
  const topicsData = await topicsRes.json();
  console.log('3. Topics endpoint:', topicsData.success ? 'PASS' : 'FAIL', `(${topicsData.topics?.length} topics)`);
  if (!topicsData.success || topicsData.topics.length !== 70) throw new Error('Topics endpoint failed');

  // 4. Problem 1 detail
  const probRes = await fetch(`${BASE}/api/dsa/problems/1`);
  const probData = await probRes.json();
  console.log('4. Problem 1 detail:', probData.success ? 'PASS' : 'FAIL', probData.problem?.title);
  if (!probData.success || probData.problem.id !== '1') throw new Error('Problem detail failed');

  // 5. Runners health
  const rHealthRes = await fetch(`${BASE}/api/dsa/runners/health`);
  const rHealth = await rHealthRes.json();
  console.log('5. Runners health:', rHealth.success ? 'PASS' : 'FAIL', 'Found', rHealth.health.length, 'runners');
  if (!rHealth.success) throw new Error('Runners health failed');

  // 6. Run Python
  const pyRunRes = await fetch(`${BASE}/api/dsa/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemId: '1',
      language: 'python',
      code: `class Solution:
    def twoSum(self, nums, target):
        m = {}
        for i, n in enumerate(nums):
            if target - n in m:
                return [m[target - n], i]
            m[n] = i
        return []`
    })
  });
  const pyRun = await pyRunRes.json();
  console.log('6. Run Python:', pyRun.result?.verdict === 'ACCEPTED' ? 'PASS' : 'FAIL', 'Verdict:', pyRun.result?.verdict);
  if (pyRun.result?.verdict !== 'ACCEPTED') throw new Error('Run Python failed');

  // 7. Run JavaScript
  const jsRunRes = await fetch(`${BASE}/api/dsa/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemId: '1',
      language: 'javascript',
      code: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
    return [];
};`
    })
  });
  const jsRun = await jsRunRes.json();
  console.log('7. Run JavaScript:', jsRun.result?.verdict === 'ACCEPTED' ? 'PASS' : 'FAIL', 'Verdict:', jsRun.result?.verdict);
  if (jsRun.result?.verdict !== 'ACCEPTED') throw new Error('Run JavaScript failed');

  // 8. Run Java
  const javaRunRes = await fetch(`${BASE}/api/dsa/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemId: '1',
      language: 'java',
      code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[]{map.get(comp), i};
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`
    })
  });
  const javaRun = await javaRunRes.json();
  console.log('8. Run Java:', javaRun.result?.verdict === 'ACCEPTED' ? 'PASS' : 'FAIL', 'Verdict:', javaRun.result?.verdict);
  if (javaRun.result?.verdict !== 'ACCEPTED') throw new Error('Run Java failed');

  // 9. Submit Python
  const pySubRes = await fetch(`${BASE}/api/dsa/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemId: '1',
      language: 'python',
      code: `class Solution:
    def twoSum(self, nums, target):
        m = {}
        for i, n in enumerate(nums):
            if target - n in m:
                return [m[target - n], i]
            m[n] = i
        return []`
    })
  });
  const pySub = await pySubRes.json();
  console.log('9. Submit Python:', pySub.result?.verdict === 'ACCEPTED' ? 'PASS' : 'FAIL', 'Verdict:', pySub.result?.verdict);
  if (pySub.result?.verdict !== 'ACCEPTED') throw new Error('Submit Python failed');

  // 10. Run C++ Execution Check
  const cppRunnerHealth = rHealth.health.find((h: any) => h.language === 'cpp');
  const cppRunRes = await fetch(`${BASE}/api/dsa/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemId: '1',
      language: 'cpp',
      code: `int main() { return 0; }`
    })
  });
  const cppRun = await cppRunRes.json();
  if (cppRunnerHealth?.available) {
    const passed = cppRun.result?.verdict !== 'RUNNER_UNAVAILABLE';
    console.log('10. Run C++ (Verified Available):', passed ? 'PASS' : 'FAIL', 'Verdict:', cppRun.result?.verdict);
    if (!passed) throw new Error('C++ Runner execution failed unexpectedly');
  } else {
    const passed = cppRun.result?.verdict === 'RUNNER_UNAVAILABLE';
    console.log('10. Run C++ (Unavailable):', passed ? 'PASS' : 'FAIL', 'Verdict:', cppRun.result?.verdict);
    if (!passed) throw new Error('C++ Runner unavailable check failed');
  }

  // 11. Malformed request (missing code)
  const badReqRes = await fetch(`${BASE}/api/dsa/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemId: '1',
      language: 'python'
    })
  });
  const badReq = await badReqRes.json();
  console.log('11. Invalid request handling:', badReq.verdict === 'INVALID_REQUEST' ? 'PASS' : 'FAIL', 'Verdict:', badReq.verdict);
  if (badReq.verdict !== 'INVALID_REQUEST') throw new Error('Invalid request test failed');

  // 12. Unsupported language
  const badLangRes = await fetch(`${BASE}/api/dsa/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemId: '1',
      language: 'rust',
      code: 'fn main() {}'
    })
  });
  const badLang = await badLangRes.json();
  console.log('12. Unsupported language:', badLang.verdict === 'INVALID_REQUEST' ? 'PASS' : 'FAIL', 'Verdict:', badLang.verdict);
  if (badLang.verdict !== 'INVALID_REQUEST') throw new Error('Unsupported language test failed');

  // 13. Progress endpoint
  const progRes = await fetch(`${BASE}/api/dsa/progress`);
  const progData = await progRes.json();
  console.log('13. Progress endpoint:', progData.success ? 'PASS' : 'FAIL', `Solved: ${progData.progress?.solvedCount}`);
  if (!progData.success) throw new Error('Progress endpoint failed');

  // 14. Bookmarks toggle & list
  const bmToggleRes = await fetch(`${BASE}/api/dsa/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemId: '1' })
  });
  const bmToggle = await bmToggleRes.json();
  console.log('14. Bookmark toggle:', bmToggle.success ? 'PASS' : 'FAIL', `Bookmarked: ${bmToggle.bookmarked}`);
  if (!bmToggle.success) throw new Error('Bookmark toggle failed');

  console.log('\n--- ALL 14 HTTP API INTEGRATION TESTS PASSED! ---');
}

testApi().catch((err) => {
  console.error('HTTP API Test FAILED:', err);
  process.exit(1);
});
