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

async function handleFetch(url: string, options?: RequestInit): Promise<any> {
  try {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => null);
    if (!res.ok || (data && data.success === false)) {
      const err = (data && data.error) || `HTTP error ${res.status}: ${res.statusText}`;
      throw new Error(err);
    }
    return data;
  } catch (err: any) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error(`Execution server offline: Could not connect to ZENSUS backend at ${API_BASE}. Please ensure the server is running on port 3000.`);
    }
    throw err;
  }
}

export async function fetchTopics(): Promise<DsaTopic[]> {
  const data = await handleFetch(`${API_BASE}/topics`);
  return data.topics;
}

export async function fetchTopic(topicId: string): Promise<DsaTopic> {
  const data = await handleFetch(`${API_BASE}/topics/${topicId}`);
  return data.topic;
}

export async function fetchTopicProblems(topicId: string): Promise<ProblemSummary[]> {
  const data = await handleFetch(`${API_BASE}/topics/${topicId}/problems`);
  return data.problems;
}

export async function fetchProblem(problemId: string): Promise<ProblemDetail> {
  const data = await handleFetch(`${API_BASE}/problems/${problemId}`);
  return data.problem;
}

export async function runCode(
  problemId: string,
  language: SupportedLanguage,
  code: string
): Promise<RunResult> {
  const data = await handleFetch(`${API_BASE}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemId, language, code }),
  });
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
  const data = await handleFetch(`${API_BASE}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemId, language, code }),
  });
  return data.result;
}

export async function fetchProblemSubmissions(problemId: string): Promise<SubmissionRecord[]> {
  const data = await handleFetch(`${API_BASE}/problems/${problemId}/submissions`);
  return data.submissions;
}

export async function fetchAllSubmissions(): Promise<SubmissionRecord[]> {
  const data = await handleFetch(`${API_BASE}/submissions`);
  return data.submissions;
}

export async function fetchProgress(): Promise<ProgressSummary> {
  const data = await handleFetch(`${API_BASE}/progress`);
  return data.progress;
}

export async function toggleBookmark(problemId: string): Promise<boolean> {
  const data = await handleFetch(`${API_BASE}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemId }),
  });
  return data.bookmarked;
}

export async function fetchBookmarks(): Promise<{ bookmarks: string[]; problems: ProblemDetail[] }> {
  const data = await handleFetch(`${API_BASE}/bookmarks`);
  return data;
}

export async function fetchRunnersHealth(): Promise<RunnerHealthStatus[]> {
  const data = await handleFetch(`${API_BASE}/runners/health`);
  return data.health;
}
