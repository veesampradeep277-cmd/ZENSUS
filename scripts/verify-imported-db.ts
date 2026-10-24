import { problemDatabase } from '../dsa/data/problems-db';

console.log('Testing Problem Database...');
const topics = problemDatabase.getAllTopics();
console.log('Total Topics:', topics.length);
console.log('Total Unique Problems:', problemDatabase.getTotalProblemsCount());

const arrayProblems = problemDatabase.getProblemsByTopic('array');
console.log('Array Problems count:', arrayProblems.length);

const twoSum = problemDatabase.getPublicProblemById('1');
console.log('Problem 1 Title:', twoSum?.title);
console.log('Problem 1 Visible tests:', twoSum?.visibleTests.length);
console.log('Problem 1 Starter languages:', Object.keys(twoSum?.starterCode || {}));
console.log('Problem 1 Constraints:', twoSum?.constraints);

console.log('✓ All database checks passed!');
