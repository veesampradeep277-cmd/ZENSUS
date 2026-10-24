function _zensusParseInput(raw) {
  const parts = [];
  let cur = '';
  let depth = 0;
  let inQuote = false;
  let quoteChar = '';
  for (const line of raw.replace(/\r\n/g, '\n').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    for (let i = 0; i < trimmed.length; i++) {
      const ch = trimmed[i];
      if (inQuote) {
        cur += ch;
        if (ch === quoteChar && (cur.length < 2 || cur[cur.length - 2] !== '\\')) inQuote = false;
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
  for (const p of parts) {
    if (p.includes('=')) {
      const idx = p.indexOf('=');
      const k = p.slice(0, idx).trim();
      const v = p.slice(idx + 1).trim();
      try {
        locs[k] = JSON.parse(v);
      } catch {
        locs[k] = eval('(' + v + ')');
      }
    }
  }
  return locs;
}

// Student code
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
  return [];
};

const inp = "nums = [2,7,11,15], target = 9";
const params = _zensusParseInput(inp);
// Call twoSum using params
const res = twoSum(params.nums, params.target);
console.log("JS Test Result:", JSON.stringify(res));
