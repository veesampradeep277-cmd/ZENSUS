import { problemDatabase } from '../dsa/data/problems-db';

const p = problemDatabase.getInternalProblemById('283');
console.log('Problem 283:', p?.title);
console.log('Starter Python:', p?.starterCode?.python);
console.log('Starter Java:', p?.starterCode?.java);
console.log('Starter JS:', p?.starterCode?.javascript);
console.log('Visible tests:', p?.visibleTests);
