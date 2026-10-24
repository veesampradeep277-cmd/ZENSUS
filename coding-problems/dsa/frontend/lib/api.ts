import {
  DsaTopic,
  ProblemDetail,
  ProblemSummary,
  RunResult,
  SubmissionRecord,
  ProgressSummary,
  RunnerHealthStatus,
  SupportedLanguage,
} from '../types/dsa.types';

export function getApiBase(): string {
  if (typeof window !== 'undefined' && window.location) {
    if ((window as any).ZENSUS_API_BASE) return (window as any).ZENSUS_API_BASE;
    if (window.location.protocol === 'file:') {
      return 'http://localhost:3000/api/dsa';
    }
    if (window.location.port === '3000') {
      return '/api/dsa';
    }
    const host = window.location.hostname || 'localhost';
    return `${window.location.protocol}//${host}:3000/api/dsa`;
  }
  return '/api/dsa';
}

const API_BASE = getApiBase();

export async function fetchTopics(): Promise<DsaTopic[]> {
  const res = await fetch(`${API_BASE}/topics`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch topics');
  return data.topics;
}

export async function fetchTopic(topicId: string): Promise<DsaTopic> {
  const res = await fetch(`${API_BASE}/topics/${topicId}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch topic');
  return data.topic;
}

export async function fetchTopicProblems(topicId: string): Promise<ProblemSummary[]> {
  const res = await fetch(`${API_BASE}/topics/${topicId}/problems`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch problems');
  return data.problems;
}

export async function fetchProblem(problemId: string): Promise<ProblemDetail> {
  const res = await fetch(`${API_BASE}/problems/${problemId}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch problem');
  return data.problem;
}

export async function runCode(
  problemId: string,
  language: SupportedLanguage,
  code: string
): Promise<RunResult> {
  const res = await fetch(`${API_BASE}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemId, language, code }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Run request failed');
  return data.result;
}

export async function submitCode(
  problemId: string,
  language: SupportedLanguage,
  code: string
): Promise<{
  submission: SubmissionRecord;
  verdict: string;
  passedTests: number;
  totalTests: number;
  runtimeMs: number;
  compilationError?: string;
  runtimeError?: string;
  firstFailedTestIndex?: number;
}> {
  const res = await fetch(`${API_BASE}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemId, language, code }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Submit request failed');
  return data.result;
}

export async function fetchProblemSubmissions(problemId: string): Promise<SubmissionRecord[]> {
  const res = await fetch(`${API_BASE}/problems/${problemId}/submissions`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch submissions');
  return data.submissions;
}

export async function fetchAllSubmissions(): Promise<SubmissionRecord[]> {
  const res = await fetch(`${API_BASE}/submissions`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch submissions');
  return data.submissions;
}

export async function fetchProgress(): Promise<ProgressSummary> {
  const res = await fetch(`${API_BASE}/progress`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch progress');
  return data.progress;
}

export async function toggleBookmark(problemId: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemId }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to toggle bookmark');
  return data.bookmarked;
}

export async function fetchBookmarks(): Promise<{ bookmarks: string[]; problems: ProblemDetail[] }> {
  const res = await fetch(`${API_BASE}/bookmarks`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch bookmarks');
  return data;
}

export async function fetchRunnersHealth(): Promise<RunnerHealthStatus[]> {
  const res = await fetch(`${API_BASE}/runners/health`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to check runners health');
  return data.health;
}
