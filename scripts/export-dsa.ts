import fs from 'fs';
import path from 'path';
import { problemDatabase } from '../dsa/data/problems-db';

async function exportDsa() {
  const topics = problemDatabase.getAllTopics();
  console.log(`Processing ${topics.length} topics...`);

  const problemsByTopic: Record<string, any[]> = {};
  const problemsById: Record<string, any> = {};

  for (const t of topics) {
    const problems = problemDatabase.getProblemsByTopic(t.id);
    problemsByTopic[t.id] = problems;
    for (const p of problems) {
      const detail = problemDatabase.getPublicProblemById(p.id);
      const internal = problemDatabase.getInternalProblemById(p.id);
      if (detail && internal) {
        problemsById[p.id] = {
          ...detail,
          visibleTests: internal.visibleTests,
          hiddenTests: internal.hiddenTests.map((h) => ({
            id: h.id,
            input: h.input,
            expectedOutput: h.expectedOutput,
            isHidden: true,
          })),
        };
      }
    }
  }

  const outputDir = path.resolve('coding-problems/dsa/assets/js');
  fs.mkdirSync(outputDir, { recursive: true });

  const dataPayload = {
    topics,
    problemsByTopic,
    problemsById,
  };

  const jsonStr = JSON.stringify(dataPayload);
  const jsContent = `window.ZENSUS_DSA_DATA = ${jsonStr};`;
  const filePath = path.join(outputDir, 'dsa-data.js');

  fs.writeFileSync(filePath, jsContent, 'utf8');
  console.log(`✓ Generated ${filePath} (${Math.round(jsonStr.length / 1024)} KB, ${Object.keys(problemsById).length} problems)`);
}

exportDsa().catch(console.error);

