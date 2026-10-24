import { problemDatabase } from '../dsa/data/problems-db';

const p = problemDatabase.getInternalProblemById('73');
console.log('Problem 73:', p?.title);
console.log('Python starter:', p?.starterCode?.python);
console.log('Java starter:', p?.starterCode?.java);
console.log('JS starter:', p?.starterCode?.javascript);
console.log('Tests:', p?.visibleTests);
