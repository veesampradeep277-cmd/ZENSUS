import { problemDatabase } from '../data/problems-db';

async function validateDsaContent() {
  console.log('==============================================');
  console.log('    ZENSUS DSA — CURRICULUM VALIDATION        ');
  console.log('==============================================');

  const topics = problemDatabase.getAllTopics();
  console.log(`Checking Topics count: ${topics.length} / 41 required`);

  if (topics.length !== 41) {
    throw new Error(`Expected 41 topics, found ${topics.length}`);
  }

  const seenProblemIds = new Set<string>();
  let totalProblems = 0;
  let totalEasy = 0;
  let totalMedium = 0;
  let totalHard = 0;

  for (const topic of topics) {
    const problems = problemDatabase.getProblemsByTopic(topic.id);
    if (problems.length !== 75) {
      throw new Error(`Topic ${topic.id} has ${problems.length} problems, expected exactly 75`);
    }

    let tEasy = 0, tMedium = 0, tHard = 0;

    for (const p of problems) {
      totalProblems++;
      if (seenProblemIds.has(p.id)) {
        throw new Error(`Duplicate problem ID detected: ${p.id}`);
      }
      seenProblemIds.add(p.id);

      if (p.difficulty === 'Easy') { tEasy++; totalEasy++; }
      else if (p.difficulty === 'Medium') { tMedium++; totalMedium++; }
      else if (p.difficulty === 'Hard') { tHard++; totalHard++; }

      const detail = problemDatabase.getPublicProblemById(p.id);
      if (!detail) {
        throw new Error(`Failed to load details for problem: ${p.id}`);
      }

      if (!detail.title || !detail.description || !detail.inputFormat || !detail.outputFormat) {
        throw new Error(`Missing core fields in problem: ${p.id}`);
      }

      if (!detail.constraints || detail.constraints.length === 0) {
        throw new Error(`Missing constraints for problem: ${p.id}`);
      }

      if (!detail.examples || detail.examples.length === 0) {
        throw new Error(`Missing examples for problem: ${p.id}`);
      }

      const langs = ['python', 'cpp', 'java', 'javascript'] as const;
      for (const lang of langs) {
        if (!detail.starterCode[lang] || detail.starterCode[lang].trim().length === 0) {
          throw new Error(`Missing starter code for ${lang} in ${p.id}`);
        }
      }

      // Ensure no hidden test or reference solution leaked in public problem
      if ((detail as any).hiddenTests) {
        throw new Error(`SECURITY LEAK: hiddenTests present in public problem ${p.id}`);
      }
      if ((detail as any).referenceSolution) {
        throw new Error(`SECURITY LEAK: referenceSolution present in public problem ${p.id}`);
      }
    }

    if (tEasy !== 25 || tMedium !== 35 || tHard !== 15) {
      throw new Error(`Topic ${topic.id} difficulty distribution mismatch: ${tEasy}E, ${tMedium}M, ${tHard}H (expected 25E/35M/15H)`);
    }
  }

  console.log(`✓ Total Topics: ${topics.length} verified (All 41 Topics present)`);
  console.log(`✓ Total Problems: ${totalProblems} (41 × 75 = 3,075) verified`);
  console.log(`✓ Difficulty Distribution per Topic: 25 Easy, 35 Medium, 15 Hard verified`);
  console.log(`✓ Difficulty Totals: Easy: ${totalEasy}, Medium: ${totalMedium}, Hard: ${totalHard}`);
  console.log(`✓ 0 Duplicate Problem IDs`);
  console.log(`✓ Dynamic Constraints and Valid Examples verified`);
  console.log(`✓ Multi-language starter templates (Python, C++, Java, JavaScript) verified`);
  console.log(`✓ Security isolation verified (0 solution or hidden test leaks in student API)`);
  console.log('==============================================');
  console.log('    ✓ ALL VALIDATION CHECKS PASSED           ');
  console.log('==============================================');
}

validateDsaContent().catch((err) => {
  console.error('Validation FAILED:', err);
  process.exit(1);
});
