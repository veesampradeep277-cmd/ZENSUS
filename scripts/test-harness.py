import sys, json

def _zensus_parse_input(raw):
    # parse key = value assignments
    parts = []
    cur = ''
    depth = 0
    in_quote = False
    quote_char = ''
    for line in raw.replace('\r\n', '\n').split('\n'):
        line = line.strip()
        if not line: continue
        for ch in line:
            if in_quote:
                cur += ch
                if ch == quote_char and (len(cur) < 2 or cur[-2] != '\\'):
                    in_quote = False
            elif ch in ('"', "'"):
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
    for part in parts:
        if '=' in part:
            k, v = part.split('=', 1)
            v = v.strip()
            # JSON parsing works for [1,2,3], "abc", true, false, null, numbers
            try:
                val = json.loads(v)
            except Exception:
                # Fallback to eval for Python syntax like True/False
                val = eval(v, {}, {})
            locs[k.strip()] = val
    return locs

from typing import *

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        m = {}
        for i, n in enumerate(nums):
            if target - n in m:
                return [m[target - n], i]
            m[n] = i

    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = max_len = 0
        for i, c in enumerate(s):
            if c in seen and seen[c] >= start:
                start = seen[c] + 1
            seen[c] = i
            max_len = max(max_len, i - start + 1)
        return max_len

sol = Solution()

# Test 1
inp1 = "nums = [2,7,11,15], target = 9"
locs1 = _zensus_parse_input(inp1)
res1 = sol.twoSum(**locs1)
print("Test 1 Result:", json.dumps(res1))

# Test 2
inp2 = 's = "abcabcbb"'
locs2 = _zensus_parse_input(inp2)
res2 = sol.lengthOfLongestSubstring(**locs2)
print("Test 2 Result:", res2)
