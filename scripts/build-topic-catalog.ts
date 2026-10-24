import fs from 'fs';
import path from 'path';

const datasetPath = 'C:\\Users\\lenovo\\Desktop\\zensus_dream\\coding-problems\\data-source\\merged_problems.json';
const raw = fs.readFileSync(datasetPath, 'utf8');
const data = JSON.parse(raw).questions;

const dsaProblems = data.filter((p: any) => {
  const topics = p.topics || [];
  return topics.some((t: string) => t !== 'Database' && t !== 'Shell');
});

const tagMap = new Map<string, { total: number; easy: number; medium: number; hard: number; problemIds: string[] }>();

for (const p of dsaProblems) {
  const diff = p.difficulty || 'Medium';
  const id = String(p.frontend_id || p.problem_id);
  for (const t of (p.topics || [])) {
    if (t === 'Database' || t === 'Shell') continue;
    if (!tagMap.has(t)) {
      tagMap.set(t, { total: 0, easy: 0, medium: 0, hard: 0, problemIds: [] });
    }
    const stat = tagMap.get(t)!;
    stat.total++;
    stat.problemIds.push(id);
    if (diff === 'Easy') stat.easy++;
    else if (diff === 'Medium') stat.medium++;
    else if (diff === 'Hard') stat.hard++;
  }
}

console.log(`Total verified DSA problems: ${dsaProblems.length}`);
console.log(`Total DSA topic tags: ${tagMap.size}`);

const sorted = Array.from(tagMap.entries()).sort((a, b) => b[1].total - a[1].total);
console.log('\nAll verified DSA topics:');
sorted.forEach(([tag, stat], idx) => {
  console.log(`${idx + 1}. ${tag} (Total: ${stat.total}, Easy: ${stat.easy}, Med: ${stat.medium}, Hard: ${stat.hard})`);
});
