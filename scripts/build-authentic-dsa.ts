import fs from 'fs';
import path from 'path';

const datasetPath = 'C:\\Users\\lenovo\\Desktop\\zensus_dream\\coding-problems\\data-source\\merged_problems.json';

if (!fs.existsSync(datasetPath)) {
  console.error(`Dataset not found at ${datasetPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(datasetPath, 'utf8');
const allQuestions: any[] = JSON.parse(raw).questions;
console.log(`Loaded ${allQuestions.length} records from data source.`);

// 1. Separate records
const databaseRecords: any[] = [];
const shellRecords: any[] = [];
const untaggedRecords: any[] = [];
const dsaRecords: any[] = [];

for (const q of allQuestions) {
  const topics: string[] = q.topics || [];
  if (topics.length === 0) {
    untaggedRecords.push(q);
    continue;
  }
  const hasDb = topics.includes('Database');
  const hasShell = topics.includes('Shell');
  const otherTopics = topics.filter(t => t !== 'Database' && t !== 'Shell');

  if (hasDb && otherTopics.length === 0) {
    databaseRecords.push(q);
  } else if (hasShell && otherTopics.length === 0) {
    shellRecords.push(q);
  } else if (otherTopics.length > 0) {
    dsaRecords.push(q);
  } else {
    untaggedRecords.push(q);
  }
}

console.log(`Separation results:`);
console.log(`  DSA Records:        ${dsaRecords.length}`);
console.log(`  Database (SQL):     ${databaseRecords.length}`);
console.log(`  Shell:              ${shellRecords.length}`);
console.log(`  Untagged:           ${untaggedRecords.length}`);
console.log(`  Total:              ${dsaRecords.length + databaseRecords.length + shellRecords.length + untaggedRecords.length}`);

// 2. Discover and count all verified DSA topic tags
const tagStats = new Map<string, { total: number; easy: number; medium: number; hard: number; problemIds: string[] }>();

for (const p of dsaRecords) {
  const diff = p.difficulty || 'Medium';
  const id = String(p.frontend_id || p.problem_id);
  const topics = (p.topics || []).filter((t: string) => t !== 'Database' && t !== 'Shell');
  for (const t of topics) {
    if (!tagStats.has(t)) {
      tagStats.set(t, { total: 0, easy: 0, medium: 0, hard: 0, problemIds: [] });
    }
    const stat = tagStats.get(t)!;
    stat.total++;
    stat.problemIds.push(id);
    if (diff === 'Easy') stat.easy++;
    else if (diff === 'Medium') stat.medium++;
    else if (diff === 'Hard') stat.hard++;
  }
}

console.log(`Verified DSA Topic Tags: ${tagStats.size}`);

// Map category and icon for each of the 70 tags
function getTagCategory(tag: string): 'Fundamentals' | 'Linear Data Structures' | 'Non-Linear Data Structures' | 'Algorithms' | 'Advanced Topics' {
  const linear = ['Array', 'String', 'Hash Table', 'Stack', 'Queue', 'Linked List', 'Monotonic Stack', 'Monotonic Queue', 'Doubly-Linked List', 'Data Stream', 'Iterator'];
  const nonLinear = ['Tree', 'Heap (Priority Queue)', 'Binary Tree', 'Design', 'Union Find', 'Segment Tree', 'Trie', 'Binary Indexed Tree', 'Hash Function', 'Binary Search Tree', 'Ordered Set'];
  const algorithms = ['Sorting', 'Greedy', 'Binary Search', 'Depth-First Search', 'Breadth-First Search', 'Matrix', 'Prefix Sum', 'Two Pointers', 'Graph', 'Sliding Window', 'Backtracking', 'Divide and Conquer', 'Memoization', 'Shortest Path', 'Topological Sort', 'Merge Sort', 'Counting Sort', 'Quickselect', 'Bucket Sort', 'Line Sweep', 'Radix Sort', 'Minimum Spanning Tree'];
  const advanced = ['Dynamic Programming', 'Bitmask', 'Geometry', 'String Matching', 'Rolling Hash', 'Randomized', 'Suffix Array', 'Concurrency', 'Interactive', 'Reservoir Sampling', 'Eulerian Circuit', 'Strongly Connected Component', 'Rejection Sampling', 'Sort', 'Biconnected Component'];
  
  if (linear.includes(tag)) return 'Linear Data Structures';
  if (nonLinear.includes(tag)) return 'Non-Linear Data Structures';
  if (algorithms.includes(tag)) return 'Algorithms';
  if (advanced.includes(tag)) return 'Advanced Topics';
  return 'Fundamentals';
}

function getTagIcon(tag: string): string {
  const iconMap: Record<string, string> = {
    'Array': 'ListOrdered',
    'String': 'Type',
    'Hash Table': 'Hash',
    'Dynamic Programming': 'Activity',
    'Math': 'Calculator',
    'Sorting': 'ArrowUpDown',
    'Greedy': 'TrendingUp',
    'Binary Search': 'Crosshair',
    'Depth-First Search': 'Compass',
    'Matrix': 'Grid',
    'Bit Manipulation': 'Cpu',
    'Breadth-First Search': 'Workflow',
    'Tree': 'GitBranch',
    'Prefix Sum': 'PlusCircle',
    'Two Pointers': 'MoveHorizontal',
    'Simulation': 'Play',
    'Heap (Priority Queue)': 'Trophy',
    'Counting': 'Clock',
    'Graph': 'Network',
    'Stack': 'Layers',
    'Sliding Window': 'Maximize2',
    'Binary Tree': 'GitMerge',
    'Enumeration': 'List',
    'Design': 'LayoutGrid',
    'Backtracking': 'CornerDownLeft',
    'Union Find': 'Boxes',
    'Number Theory': 'Divide',
    'Linked List': 'Link',
    'Ordered Set': 'ListFilter',
    'Segment Tree': 'FolderTree',
    'Monotonic Stack': 'BarChart2',
    'Combinatorics': 'Layers2',
    'Bitmask': 'Binary',
    'Trie': 'Share2',
    'Divide and Conquer': 'Split',
    'Memoization': 'Bookmark',
    'Recursion': 'Repeat',
    'Queue': 'AlignJustify',
    'Geometry': 'Box',
    'String Matching': 'Search',
    'Binary Indexed Tree': 'FileTree',
    'Hash Function': 'Key',
    'Binary Search Tree': 'TreePine',
    'Shortest Path': 'Navigation',
    'Topological Sort': 'GitPullRequest',
    'Rolling Hash': 'RefreshCw',
    'Game Theory': 'Gamepad2',
    'Monotonic Queue': 'ListOrdered',
    'Brainteaser': 'Lightbulb',
    'Data Stream': 'Radio',
    'Randomized': 'Dices',
    'Merge Sort': 'GitMerge',
    'Doubly-Linked List': 'MoveHorizontal',
    'Counting Sort': 'SortAsc',
    'Quickselect': 'Crosshair',
    'Bucket Sort': 'Archive',
    'Line Sweep': 'Maximize',
    'Probability and Statistics': 'Percent',
    'Concurrency': 'Cpu',
    'Iterator': 'ChevronsRight',
    'Interactive': 'MessageSquare',
    'Suffix Array': 'FileCode',
    'Reservoir Sampling': 'Flame',
    'Radix Sort': 'SlidersHorizontal',
    'Eulerian Circuit': 'Orbit',
    'Minimum Spanning Tree': 'Share',
    'Strongly Connected Component': 'Network',
    'Rejection Sampling': 'Target',
    'Sort': 'ArrowUpDown',
    'Biconnected Component': 'Boxes',
  };
  return iconMap[tag] || 'Code';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Generate topic configs
const sortedTags = Array.from(tagStats.entries()).sort((a, b) => b[1].total - a[1].total);

const topicsConfig = sortedTags.map(([tag, stat], idx) => {
  const slug = slugify(tag);
  return {
    id: slug,
    number: idx + 1,
    slug: slug,
    title: tag,
    category: getTagCategory(tag),
    description: `Master authentic ${tag} problems with verified examples, starter code templates, and test cases.`,
    iconName: getTagIcon(tag),
    totalProblems: stat.total,
    easyCount: stat.easy,
    mediumCount: stat.medium,
    hardCount: stat.hard,
  };
});

// Helper to parse example input/output
function parseExample(text: string): { input: string; output: string; explanation?: string } | null {
  if (!text) return null;
  const inMatch = text.match(/Input:?\s*([\s\S]*?)(?=(?:Output:?|$))/i);
  const outMatch = text.match(/Output:?\s*([\s\S]*?)(?=(?:Explanation:?|$))/i);
  const expMatch = text.match(/Explanation:?\s*([\s\S]*?)$/i);
  if (inMatch && outMatch) {
    const input = inMatch[1].trim();
    const output = outMatch[1].trim();
    if (input && output) {
      return {
        input,
        output,
        explanation: expMatch ? expMatch[1].trim() : undefined,
      };
    }
  }
  return null;
}

// 3. Process and sanitize all DSA problems
const processedProblemsById: Record<string, any> = {};
const problemsByTopicId: Record<string, any[]> = {};

for (const t of topicsConfig) {
  problemsByTopicId[t.id] = [];
}

const tagToTopicIdMap = new Map<string, string>();
for (const t of topicsConfig) {
  tagToTopicIdMap.set(t.title, t.id);
}

for (const p of dsaRecords) {
  const id = String(p.frontend_id || p.problem_id);
  const cleanTags = (p.topics || []).filter((t: string) => t !== 'Database' && t !== 'Shell');
  const primaryTopicTag = cleanTags[0] || 'Array';
  const primaryTopicId = tagToTopicIdMap.get(primaryTopicTag) || 'array';

  // Parse examples
  const examples: Array<{ input: string; output: string; explanation?: string }> = [];
  const visibleTests: Array<{ id: string; input: string; expectedOutput: string; label?: string }> = [];

  const rawExamples: any[] = (p.examples && p.examples.length > 0) ? [...p.examples] : [];
  const validExamples: Array<{ input: string; output: string; explanation?: string }> = [];

  for (const ex of rawExamples) {
    const parsed = parseExample(ex.example_text || '');
    if (parsed) {
      validExamples.push(parsed);
    }
  }

  // Fallback to description regex if rawExamples did not yield parsed examples
  if (validExamples.length === 0 && p.description && p.description.includes('Example 1')) {
    const exRegex = /Example\s+\d+:?\s*([\s\S]*?)(?=(?:Example\s+\d+:?|Constraints:|$))/gi;
    let match;
    while ((match = exRegex.exec(p.description)) !== null) {
      const parsed = parseExample(match[1]);
      if (parsed) {
        validExamples.push(parsed);
      }
    }
  }

  // Preserve non-empty descriptive text for ambiguous problems without fabricating fake outputs
  if (validExamples.length === 0) {
    if (rawExamples.length > 0 && rawExamples[0].example_text?.trim()) {
      validExamples.push({
        input: rawExamples[0].example_text.trim(),
        output: 'See problem statement / class operations',
      });
    } else {
      validExamples.push({
        input: 'N/A',
        output: 'N/A',
      });
    }
  }

  validExamples.forEach((ex, idx) => {
    examples.push(ex);
    if (ex.input && ex.output && ex.input !== 'N/A' && !ex.output.includes('See problem statement')) {
      visibleTests.push({
        id: `vis_${idx + 1}`,
        input: ex.input,
        expectedOutput: ex.output,
        label: `Example ${idx + 1}`,
      });
    }
  });

  const diff = (p.difficulty || 'Medium') as 'Easy' | 'Medium' | 'Hard';
  const progressionStage =
    diff === 'Easy' ? 'Foundation' : diff === 'Medium' ? 'Intermediate' : 'Interview / Placement';

  // Starter code templates
  const starterCode = {
    python: p.code_snippets?.python3 || p.code_snippets?.python || '',
    javascript: p.code_snippets?.javascript || '',
    java: p.code_snippets?.java || '',
    cpp: p.code_snippets?.cpp || '',
  };

  const problemDetail = {
    id,
    topicId: primaryTopicId,
    topicTitle: primaryTopicTag,
    order: parseInt(id, 10) || 1,
    title: p.title,
    difficulty: diff,
    progressionStage,
    tags: cleanTags,
    executionType: 'function',
    status: 'published',
    isDraft: false,
    description: p.description || '',
    inputFormat: 'Parsed parameter inputs as given in examples and problem statement.',
    outputFormat: 'Return value as specified in function signature and examples.',
    constraints: p.constraints || [],
    examples,
    visibleTests,
    starterCode,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  };

  processedProblemsById[id] = problemDetail;

  const problemSummary = {
    id,
    topicId: primaryTopicId,
    topicTitle: primaryTopicTag,
    order: parseInt(id, 10) || 1,
    title: p.title,
    difficulty: diff,
    progressionStage,
    tags: cleanTags,
    executionType: 'function',
    status: 'published',
    isDraft: false,
  };

  // Add problem to all topics it is tagged with
  for (const tag of cleanTags) {
    const topicId = tagToTopicIdMap.get(tag);
    if (topicId && problemsByTopicId[topicId]) {
      problemsByTopicId[topicId].push({
        ...problemSummary,
        topicId,
        topicTitle: tag,
      });
    }
  }
}

// Sort problems in each topic by ID/order
for (const topicId of Object.keys(problemsByTopicId)) {
  problemsByTopicId[topicId].sort((a, b) => a.order - b.order);
}

console.log(`\nProcessed ${Object.keys(processedProblemsById).length} unique problems.`);

// 4. Write dsa/config/topics.ts
const topicsTsContent = `// Auto-generated verified DSA topics from authentic dataset
// Total verified topics: ${topicsConfig.length}
import { DsaTopic } from '../../src/types/dsa.types';

export const DSA_TOPICS_CONFIG: DsaTopic[] = ${JSON.stringify(topicsConfig, null, 2)};
`;

fs.writeFileSync(path.resolve('dsa/config/topics.ts'), topicsTsContent, 'utf8');
console.log(`✓ Wrote dsa/config/topics.ts (${topicsConfig.length} topics)`);

// 5. Write dsa/data/authentic-catalog.json
const catalogPayload = {
  topics: topicsConfig,
  problemsByTopic: problemsByTopicId,
  problemsById: processedProblemsById,
  metadata: {
    totalUniqueProblems: Object.keys(processedProblemsById).length,
    totalTopics: topicsConfig.length,
    importedAt: new Date().toISOString(),
    excludedDatabaseCount: databaseRecords.length,
    excludedShellCount: shellRecords.length,
    excludedUntaggedCount: untaggedRecords.length,
  },
};

fs.writeFileSync(path.resolve('dsa/data/authentic-catalog.json'), JSON.stringify(catalogPayload), 'utf8');
console.log(`✓ Wrote dsa/data/authentic-catalog.json (${Math.round(JSON.stringify(catalogPayload).length / 1024)} KB)`);

// 6. Write coding-problems/dsa/assets/js/dsa-data.js
const dsaDataJsContent = `window.ZENSUS_DSA_DATA = ${JSON.stringify(catalogPayload)};`;
fs.writeFileSync(path.resolve('coding-problems/dsa/assets/js/dsa-data.js'), dsaDataJsContent, 'utf8');
console.log(`✓ Wrote coding-problems/dsa/assets/js/dsa-data.js (${Math.round(dsaDataJsContent.length / 1024)} KB)`);
