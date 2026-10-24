import { problemDatabase } from '../dsa/data/problems-db';

async function auditCatalog() {
  console.log('Auditing entire problem catalog (2750 problems)...');
  const topics = problemDatabase.getAllTopics();
  console.log(`Topics count: ${topics.length}`);

  let totalProblems = 0;
  const executionTypes: Record<string, number> = {};
  const missingStarter: Record<string, number> = { python: 0, javascript: 0, java: 0, cpp: 0, c: 0 };
  let missingTests = 0;
  let emptyTests = 0;
  let validProblems = 0;

  const topicsSummary: Array<{ id: string; title: string; count: number }> = [];

  for (const topic of topics) {
    const list = problemDatabase.getProblemsByTopic(topic.id);
    topicsSummary.push({ id: topic.id, title: topic.title, count: list.length });
    totalProblems += list.length;

    for (const p of list) {
      const full = problemDatabase.getInternalProblemById(p.id);
      if (!full) continue;

      const et = full.executionType || 'unknown';
      executionTypes[et] = (executionTypes[et] || 0) + 1;

      if (!full.starterCode) {
        missingStarter.python++;
        missingStarter.javascript++;
        missingStarter.java++;
        missingStarter.cpp++;
        missingStarter.c++;
      } else {
        if (!full.starterCode.python) missingStarter.python++;
        if (!full.starterCode.javascript) missingStarter.javascript++;
        if (!full.starterCode.java) missingStarter.java++;
        if (!full.starterCode.cpp) missingStarter.cpp++;
        if (!full.starterCode.c) missingStarter.c++;
      }

      const tests = [...(full.visibleTests || []), ...(full.hiddenTests || [])];
      if (tests.length === 0) {
        if (!full.examples || full.examples.length === 0 || full.examples[0].input === 'N/A') {
          missingTests++;
        }
      }
    }
  }

  console.log('Total topic associations:', totalProblems);
  console.log('Total unique problems in DB:', problemDatabase.getTotalProblemsCount());
  console.log('Execution types count (associations):', executionTypes);
  console.log('Missing starter codes:', missingStarter);
  console.log('Missing tests count:', missingTests);

  // Now sample problems across different execution types and topics
  console.log('\nSampling 10 distinct problems:');
  const sampleIds = ['1', '2', '3', '20', '21', '70', '100', '121', '200', '300'];
  for (const id of sampleIds) {
    const p = problemDatabase.getInternalProblemById(id);
    if (p) {
      console.log(`[${id}] ${p.title} | Type: ${p.executionType} | Tests: ${p.visibleTests?.length} | Python: ${p.starterCode?.python ? 'Yes' : 'No'} | Java: ${p.starterCode?.java ? 'Yes' : 'No'} | JS: ${p.starterCode?.javascript ? 'Yes' : 'No'} | C++: ${p.starterCode?.cpp ? 'Yes' : 'No'} | C: ${p.starterCode?.c ? 'Yes' : 'No'}`);
    }
  }
}

auditCatalog().catch(console.error);
