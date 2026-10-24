import fs from 'fs';
import path from 'path';

const datasetDir = 'C:\\Users\\lenovo\\Desktop\\zensus_dream\\coding-problems\\data-source';
const mergedPath = path.join(datasetDir, 'merged_problems.json');
const problemsDir = path.join(datasetDir, 'problems');

console.log('--- Analyzing Dataset ---');

const raw = fs.readFileSync(mergedPath, 'utf8');
const parsed = JSON.parse(raw);
const records: any[] = parsed.questions || parsed;

console.log(`Total records in dataset: ${records.length}`);

if (fs.existsSync(problemsDir)) {
  const problemFiles = fs.readdirSync(problemsDir).filter(f => f.endsWith('.json'));
  console.log(`Total files in problems/ directory: ${problemFiles.length}`);
}

const tagCounts = new Map<string, number>();
let noTagsCount = 0;
let emptyDescCount = 0;
let databaseCount = 0;
let shellCount = 0;
let concurrencyCount = 0;

const idSet = new Set<string>();
let duplicateIdCount = 0;
let missingSnippets = 0;
const snippetLanguages = new Map<string, number>();
const difficultyCounts = new Map<string, number>();

// Track invalid/malformed records
const malformedRecords: Array<{ id: string; title: string; reason: string }> = [];

for (const p of records) {
  const pid = String(p.frontend_id || p.problem_id || '');
  if (!pid) {
    malformedRecords.push({ id: '(none)', title: p.title || 'Untitled', reason: 'Missing problem ID' });
    continue;
  }

  if (idSet.has(pid)) {
    duplicateIdCount++;
  } else {
    idSet.add(pid);
  }

  const diff = p.difficulty || 'Unknown';
  difficultyCounts.set(diff, (difficultyCounts.get(diff) || 0) + 1);

  if (!p.description || !p.description.trim()) {
    emptyDescCount++;
    malformedRecords.push({ id: pid, title: p.title, reason: 'Empty description' });
  }

  const topics: string[] = Array.isArray(p.topics) ? p.topics : [];
  if (topics.length === 0) {
    noTagsCount++;
  }

  let isDb = false;
  let isShell = false;
  let isConcurrency = false;

  for (const t of topics) {
    tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    const tl = t.toLowerCase();
    if (tl === 'database') isDb = true;
    if (tl === 'shell') isShell = true;
    if (tl === 'concurrency') isConcurrency = true;
  }

  if (isDb) databaseCount++;
  if (isShell) shellCount++;
  if (isConcurrency) concurrencyCount++;

  if (!p.code_snippets || Object.keys(p.code_snippets).length === 0) {
    missingSnippets++;
  } else {
    for (const lang of Object.keys(p.code_snippets)) {
      snippetLanguages.set(lang, (snippetLanguages.get(lang) || 0) + 1);
    }
  }
}

console.log(`Unique problem IDs: ${idSet.size}, Duplicates: ${duplicateIdCount}`);
console.log(`Empty description count: ${emptyDescCount}`);
console.log(`No tags count: ${noTagsCount}`);
console.log(`Database (SQL) tagged: ${databaseCount}`);
console.log(`Shell tagged: ${shellCount}`);
console.log(`Concurrency tagged: ${concurrencyCount}`);
console.log(`Missing code snippets: ${missingSnippets}`);
console.log(`Malformed/Flagged records: ${malformedRecords.length}`);
if (malformedRecords.length > 0) {
  console.log('Sample malformed:', malformedRecords.slice(0, 5));
}

console.log('\nDifficulty distribution:');
for (const [diff, count] of difficultyCounts.entries()) {
  console.log(`  ${diff}: ${count}`);
}

console.log('\nTop 40 Tags:');
const sortedTags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);
for (const [tag, count] of sortedTags.slice(0, 40)) {
  console.log(`  ${tag}: ${count}`);
}

console.log(`\nTotal unique tags: ${tagCounts.size}`);
console.log('\nAvailable languages in code_snippets:');
for (const [lang, count] of Array.from(snippetLanguages.entries()).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${lang}: ${count}`);
}
