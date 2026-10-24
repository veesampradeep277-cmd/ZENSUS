import { TOPIC_19_PROBLEMS } from '../dsa/data/topics/topic-19';

interface AuditResult {
  order: number;
  id: string;
  title: string;
  difficulty: string;
  stage: string;
  visibleCount: number;
  hiddenCount: number;
  exampleCount: number;
  starterLangs: string[];
  issues: string[];
}

function auditTopic19() {
  console.log('====================================================');
  console.log('      AUDITING TOPIC 19 (75 PROBLEMS) SOURCE        ');
  console.log('====================================================');

  const keys = Object.keys(TOPIC_19_PROBLEMS);
  console.log(`Total problem keys found: ${keys.length}`);

  const results: AuditResult[] = [];
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();

  for (let order = 1; order <= 75; order++) {
    const id = `19-bit-manipulation-${String(order).padStart(3, '0')}`;
    const p = TOPIC_19_PROBLEMS[id];
    const issues: string[] = [];

    if (!p) {
      issues.push(`Missing problem definition for order ${order} (ID: ${id})`);
      results.push({ order, id, title: 'MISSING', difficulty: '', stage: '', visibleCount: 0, hiddenCount: 0, exampleCount: 0, starterLangs: [], issues });
      continue;
    }

    if (seenIds.has(id)) issues.push('Duplicate ID');
    seenIds.add(id);

    if (seenTitles.has(p.title!)) issues.push(`Duplicate title: ${p.title}`);
    seenTitles.add(p.title!);

    if (!p.description || p.description.length < 20) issues.push('Short/missing description');
    if (!p.inputFormat) issues.push('Missing inputFormat');
    if (!p.outputFormat) issues.push('Missing outputFormat');
    if (!p.constraints || p.constraints.length === 0) issues.push('Missing constraints');

    const examples = p.examples || [];
    if (examples.length === 0) issues.push('Missing examples');
    for (let i = 0; i < examples.length; i++) {
      const ex = examples[i];
      if (ex.input === undefined || ex.output === undefined) {
        issues.push(`Example ${i + 1} missing input/output`);
      }
    }

    const vTests = p.visibleTests || [];
    if (vTests.length === 0) issues.push('No visible tests');
    for (let i = 0; i < vTests.length; i++) {
      if (vTests[i].input === undefined || vTests[i].expectedOutput === undefined) {
        issues.push(`Visible test ${i + 1} missing input/output`);
      }
    }

    const hTests = p.hiddenTests || [];
    if (hTests.length === 0) issues.push('No hidden tests');
    for (let i = 0; i < hTests.length; i++) {
      if (hTests[i].input === undefined || hTests[i].expectedOutput === undefined) {
        issues.push(`Hidden test ${i + 1} missing input/output`);
      }
    }

    const starters = p.starterCode || ({} as any);
    const langs = ['python', 'cpp', 'java', 'javascript'];
    const presentLangs: string[] = [];
    for (const lang of langs) {
      if (starters[lang] && starters[lang].length > 10) presentLangs.push(lang);
      else issues.push(`Missing starter code for ${lang}`);
    }

    // Inspect input format vs starter code parsing logic
    const py = starters.python || '';
    const inFmt = (p.inputFormat || '').toLowerCase();
    if (inFmt.includes('single integer') || inFmt.includes('a single non-negative') || inFmt.includes('single line containing integer n')) {
      if (py.includes('tokens.slice(1, n + 1)') || py.includes('[int(x) for x in tokens[1:n+1]]')) {
        issues.push('Input format is single int, but starter code parses array (tokens[1:n+1])');
      }
    } else if (inFmt.includes('two space-separated integers') || inFmt.includes('two integers a and b')) {
      if (py.includes('[int(x) for x in tokens[1:n+1]]')) {
        issues.push('Input format is two ints, but starter code parses array');
      }
    } else if (inFmt.includes('string') || inFmt.includes('words / string') || inFmt.includes('single string')) {
      if (py.includes('[int(x) for x in tokens[1:n+1]]')) {
        issues.push('Input format is string, but starter code parses array of ints');
      }
    }

    results.push({
      order,
      id,
      title: p.title || '',
      difficulty: p.difficulty || '',
      stage: p.progressionStage || '',
      visibleCount: vTests.length,
      hiddenCount: hTests.length,
      exampleCount: examples.length,
      starterLangs: presentLangs,
      issues
    });
  }

  const withIssues = results.filter(r => r.issues.length > 0);
  console.log(`\nAudit Summary:`);
  console.log(`Total Problems Evaluated: ${results.length}`);
  console.log(`Problems with Clean Data: ${results.length - withIssues.length}`);
  console.log(`Problems with Issues: ${withIssues.length}`);

  if (withIssues.length > 0) {
    console.log('\n--- Details of Problems with Issues ---');
    for (const item of withIssues) {
      console.log(`[#${String(item.order).padStart(2, '0')}] ${item.id} - "${item.title}":`);
      for (const issue of item.issues) {
        console.log(`     ✗ ${issue}`);
      }
    }
  }

  // Also print list of all 75 problem titles
  console.log('\n--- All 75 Problem Titles ---');
  for (const item of results) {
    console.log(`${String(item.order).padStart(2, '0')}. [${item.difficulty}] ${item.title} (Tests: ${item.visibleCount}v / ${item.hiddenCount}h)`);
  }
}

auditTopic19();

