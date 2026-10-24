import { problemDatabase } from '../dsa/data/problems-db';

for (const id of ['26', '27', '21', '206', '104']) {
  const p = problemDatabase.getInternalProblemById(id);
  console.log(`[${id}] ${p?.title}: expectedOutput=${JSON.stringify(p?.visibleTests?.map(t => t.expectedOutput))}`);
}
