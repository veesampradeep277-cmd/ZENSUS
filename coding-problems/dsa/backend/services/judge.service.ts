import { problemDatabase } from '../../dsa/data/problems-db';
import { executionService } from './execution.service';
import { compareOutputs } from '../judge/comparator';
import {
  SupportedLanguage,
  RunResult,
  JudgeVerdict,
  ExecutionTestCaseResult,
  SubmissionRecord,
} from '../../src/types/dsa.types';
import crypto from 'crypto';

export class JudgeService {
  private submissions: Map<string, SubmissionRecord[]> = new Map(); // problemId -> submissions
  private allSubmissions: SubmissionRecord[] = [];
  private solvedProblems: Set<string> = new Set();
  private attemptedProblems: Set<string> = new Set();
  private bookmarks: Set<string> = new Set();

  async runProblem(
    problemId: string,
    language: SupportedLanguage,
    code: string
  ): Promise<RunResult> {
    const problem = problemDatabase.getInternalProblemById(problemId);
    if (!problem) {
      throw new Error(`Problem not found: ${problemId}`);
    }

    if (problem.status === 'draft' || problem.isDraft) {
      throw new Error(`Problem "${problem.title}" is currently in draft status and unavailable for execution.`);
    }

    if (problem.visibleTests.length === 0 && (problem.examples.length === 0 || problem.examples[0].input === 'N/A')) {
      throw new Error(`Problem "${problem.title}" has no test suite available for execution.`);
    }

    const visibleTests = problem.visibleTests.map(t => ({
      id: t.id,
      input: t.input,
      expectedOutput: t.expectedOutput,
      label: t.label || 'Visible Test',
    }));

    if (visibleTests.length === 0) {
      // Fallback to example tests if no explicit visible test list
      problem.examples.forEach((ex, idx) => {
        visibleTests.push({
          id: `ex_${idx + 1}`,
          input: ex.input + '\n',
          expectedOutput: ex.output + '\n',
          label: `Example ${idx + 1}`,
        });
      });
    }

    const execResult = await executionService.executeTestSuite(
      language,
      code,
      visibleTests,
      problem.timeLimitMs || 2000
    );

    if (execResult.runnerUnavailable) {
      return {
        success: false,
        verdict: 'RUNNER_UNAVAILABLE',
        runtimeMs: 0,
        errorMessage: execResult.unavailableReason || `Toolchain for ${language} is unavailable on the execution server.`,
        testResults: [],
        passedTests: 0,
        totalTests: visibleTests.length,
      };
    }

    if (execResult.compilationError) {
      return {
        success: false,
        verdict: 'COMPILATION_ERROR',
        runtimeMs: 0,
        compilationError: execResult.compilationError,
        testResults: [],
        passedTests: 0,
        totalTests: visibleTests.length,
      };
    }

    const testResults: ExecutionTestCaseResult[] = [];
    let passedCount = 0;
    let maxRuntime = 0;
    let overallVerdict: JudgeVerdict = 'ACCEPTED';

    for (const res of execResult.results) {
      maxRuntime = Math.max(maxRuntime, res.runtimeMs);

      if (res.timedOut) {
        overallVerdict = 'TIME_LIMIT_EXCEEDED';
        testResults.push({
          testId: res.testId,
          label: res.label,
          input: res.input,
          expectedOutput: res.expectedOutput,
          actualOutput: res.actualOutput,
          passed: false,
          runtimeMs: res.runtimeMs,
          status: 'TIME_LIMIT_EXCEEDED',
          errorMessage: 'Time Limit Exceeded',
        });
        continue;
      }

      if (res.exitCode !== 0 && res.errorMessage) {
        overallVerdict = 'RUNTIME_ERROR';
        testResults.push({
          testId: res.testId,
          label: res.label,
          input: res.input,
          expectedOutput: res.expectedOutput,
          actualOutput: res.actualOutput,
          passed: false,
          runtimeMs: res.runtimeMs,
          status: 'RUNTIME_ERROR',
          errorMessage: res.errorMessage,
        });
        continue;
      }

      const comp = compareOutputs(res.actualOutput, res.expectedOutput, 'token');
      if (comp.passed) {
        passedCount++;
        testResults.push({
          testId: res.testId,
          label: res.label,
          input: res.input,
          expectedOutput: res.expectedOutput,
          actualOutput: res.actualOutput,
          passed: true,
          runtimeMs: res.runtimeMs,
          status: 'ACCEPTED',
        });
      } else {
        if (overallVerdict === 'ACCEPTED') {
          overallVerdict = 'WRONG_ANSWER';
        }
        testResults.push({
          testId: res.testId,
          label: res.label,
          input: res.input,
          expectedOutput: res.expectedOutput,
          actualOutput: res.actualOutput,
          passed: false,
          runtimeMs: res.runtimeMs,
          status: 'WRONG_ANSWER',
        });
      }
    }

    return {
      success: overallVerdict === 'ACCEPTED',
      verdict: overallVerdict,
      runtimeMs: maxRuntime,
      testResults,
      passedTests: passedCount,
      totalTests: visibleTests.length,
    };
  }

  async submitProblem(
    problemId: string,
    language: SupportedLanguage,
    code: string
  ): Promise<{
    submission: SubmissionRecord;
    verdict: JudgeVerdict;
    passedTests: number;
    totalTests: number;
    runtimeMs: number;
    compilationError?: string;
    runtimeError?: string;
    firstFailedTestIndex?: number;
  }> {
    const problem = problemDatabase.getInternalProblemById(problemId);
    if (!problem) {
      throw new Error(`Problem not found: ${problemId}`);
    }

    if (problem.status === 'draft' || problem.isDraft) {
      throw new Error(`Problem "${problem.title}" is currently in draft status and unavailable for submission.`);
    }

    this.attemptedProblems.add(problemId);

    // Combine visible tests and hidden tests
    const allTests = [
      ...problem.visibleTests.map(t => ({ id: t.id, input: t.input, expectedOutput: t.expectedOutput, isHidden: false })),
      ...problem.hiddenTests.map(t => ({ id: t.id, input: t.input, expectedOutput: t.expectedOutput, isHidden: true })),
    ];

    if (allTests.length === 0 && problem.examples && problem.examples.length > 0) {
      problem.examples.forEach((ex, idx) => {
        if (ex.input && ex.input !== 'N/A') {
          allTests.push({
            id: `ex_${idx + 1}`,
            input: ex.input + '\n',
            expectedOutput: ex.output + '\n',
            isHidden: false,
          });
        }
      });
    }

    if (allTests.length === 0) {
      throw new Error(`Problem "${problem.title}" has no test suite available for submission.`);
    }

    const execResult = await executionService.executeTestSuite(
      language,
      code,
      allTests,
      problem.timeLimitMs || 2000
    );

    const submissionId = `sub_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    if (execResult.runnerUnavailable) {
      const record: SubmissionRecord = {
        id: submissionId,
        problemId,
        problemTitle: problem.title,
        topicId: problem.topicId,
        language,
        code,
        verdict: 'RUNNER_UNAVAILABLE',
        runtimeMs: 0,
        passedTests: 0,
        totalTests: allTests.length,
        createdAt: new Date().toISOString(),
      };
      this.recordSubmission(record);
      return {
        submission: record,
        verdict: 'RUNNER_UNAVAILABLE',
        passedTests: 0,
        totalTests: allTests.length,
        runtimeMs: 0,
        runtimeError: execResult.unavailableReason || `Toolchain for ${language} is unavailable on the execution server.`,
      };
    }

    if (execResult.compilationError) {
      const record: SubmissionRecord = {
        id: submissionId,
        problemId,
        problemTitle: problem.title,
        topicId: problem.topicId,
        language,
        code,
        verdict: 'COMPILATION_ERROR',
        runtimeMs: 0,
        passedTests: 0,
        totalTests: allTests.length,
        createdAt: new Date().toISOString(),
      };
      this.recordSubmission(record);
      return {
        submission: record,
        verdict: 'COMPILATION_ERROR',
        passedTests: 0,
        totalTests: allTests.length,
        runtimeMs: 0,
        compilationError: execResult.compilationError,
      };
    }

    let passedCount = 0;
    let maxRuntime = 0;
    let finalVerdict: JudgeVerdict = 'ACCEPTED';
    let firstFailedIndex: number | undefined;
    let runtimeError: string | undefined;

    for (let i = 0; i < execResult.results.length; i++) {
      const res = execResult.results[i];
      maxRuntime = Math.max(maxRuntime, res.runtimeMs);

      if (res.timedOut) {
        if (finalVerdict === 'ACCEPTED') {
          finalVerdict = 'TIME_LIMIT_EXCEEDED';
          firstFailedIndex = i + 1;
        }
        break;
      }

      if (res.exitCode !== 0 && res.errorMessage) {
        if (finalVerdict === 'ACCEPTED') {
          finalVerdict = 'RUNTIME_ERROR';
          runtimeError = res.errorMessage;
          firstFailedIndex = i + 1;
        }
        break;
      }

      const comp = compareOutputs(res.actualOutput, res.expectedOutput, 'token');
      if (comp.passed) {
        passedCount++;
      } else {
        if (finalVerdict === 'ACCEPTED') {
          finalVerdict = 'WRONG_ANSWER';
          firstFailedIndex = i + 1;
        }
      }
    }

    if (passedCount === allTests.length) {
      finalVerdict = 'ACCEPTED';
      this.solvedProblems.add(problemId);
    }

    const record: SubmissionRecord = {
      id: submissionId,
      problemId,
      problemTitle: problem.title,
      topicId: problem.topicId,
      language,
      code,
      verdict: finalVerdict,
      runtimeMs: maxRuntime,
      passedTests: passedCount,
      totalTests: allTests.length,
      createdAt: new Date().toISOString(),
    };

    this.recordSubmission(record);

    return {
      submission: record,
      verdict: finalVerdict,
      passedTests: passedCount,
      totalTests: allTests.length,
      runtimeMs: maxRuntime,
      runtimeError,
      firstFailedTestIndex: firstFailedIndex,
    };
  }

  private recordSubmission(record: SubmissionRecord) {
    this.allSubmissions.unshift(record);
    const existing = this.submissions.get(record.problemId) || [];
    existing.unshift(record);
    this.submissions.set(record.problemId, existing);
  }

  getSubmissions(problemId: string): SubmissionRecord[] {
    return this.submissions.get(problemId) || [];
  }

  getAllSubmissions(): SubmissionRecord[] {
    return this.allSubmissions;
  }

  getProgress() {
    const totalProblems = problemDatabase.getTotalProblemsCount();
    const solvedCount = this.solvedProblems.size;
    const attemptedCount = this.attemptedProblems.size;
    const totalSubmissions = this.allSubmissions.length;
    const acceptedSubmissions = this.allSubmissions.filter(s => s.verdict === 'ACCEPTED').length;
    const accuracy = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;

    // Difficulty breakdown of solved
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    const topicProgress: Record<string, { solved: number; attempted: number; total: number }> = {};

    for (const probId of this.solvedProblems) {
      const p = problemDatabase.getInternalProblemById(probId);
      if (p) {
        if (p.difficulty === 'Easy') easySolved++;
        else if (p.difficulty === 'Medium') mediumSolved++;
        else if (p.difficulty === 'Hard') hardSolved++;
      }
    }

    for (const topic of problemDatabase.getAllTopics()) {
      let tSolved = 0;
      let tAttempted = 0;
      const probs = problemDatabase.getProblemsByTopic(topic.id);
      for (const p of probs) {
        if (this.solvedProblems.has(p.id)) tSolved++;
        if (this.attemptedProblems.has(p.id)) tAttempted++;
      }
      topicProgress[topic.id] = {
        solved: tSolved,
        attempted: tAttempted,
        total: probs.length,
      };
    }

    return {
      totalProblems,
      solvedCount,
      attemptedCount,
      accuracyPercentage: accuracy,
      streakDays: solvedCount > 0 ? 1 : 0,
      longestStreak: solvedCount > 0 ? 1 : 0,
      easySolved,
      mediumSolved,
      hardSolved,
      topicProgress,
      bookmarks: Array.from(this.bookmarks),
    };
  }

  toggleBookmark(problemId: string): boolean {
    if (this.bookmarks.has(problemId)) {
      this.bookmarks.delete(problemId);
      return false;
    } else {
      this.bookmarks.add(problemId);
      return true;
    }
  }

  getBookmarks(): string[] {
    return Array.from(this.bookmarks);
  }

  isProblemSolved(problemId: string): boolean {
    return this.solvedProblems.has(problemId);
  }

  isProblemAttempted(problemId: string): boolean {
    return this.attemptedProblems.has(problemId);
  }

  isProblemBookmarked(problemId: string): boolean {
    return this.bookmarks.has(problemId);
  }
}

export const judgeService = new JudgeService();
