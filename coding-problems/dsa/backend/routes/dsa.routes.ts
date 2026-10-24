import { Router, Request, Response } from 'express';
import { problemDatabase } from '../../dsa/data/problems-db';
import { judgeService } from '../services/judge.service';
import { executionService } from '../services/execution.service';
import { SupportedLanguage } from '../../src/types/dsa.types';

export const dsaRouter = Router();

// GET /api/dsa - Diagnostic & health status endpoint
dsaRouter.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'zensus-dsa-engine',
    message: 'ZENSUS DSA execution engine is active and reachable.',
    routes: {
      health: '/api/health',
      runnerHealth: '/api/dsa/runners/health',
      topics: '/api/dsa/topics',
      run: '/api/dsa/run',
      submit: '/api/dsa/submit',
      progress: '/api/dsa/progress',
    },
  });
});

// GET all verified topics with solved/attempted counts
dsaRouter.get('/topics', (req: Request, res: Response) => {
  try {
    const topics = problemDatabase.getAllTopics();
    const progress = judgeService.getProgress();

    const enriched = topics.map(topic => {
      const pData = progress.topicProgress[topic.id] || { solved: 0, attempted: 0, total: topic.totalProblems };
      return {
        ...topic,
        solvedCount: pData.solved,
        attemptedCount: pData.attempted,
      };
    });

    res.json({ success: true, topics: enriched });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET specific topic
dsaRouter.get('/topics/:topicId', (req: Request, res: Response) => {
  try {
    const topic = problemDatabase.getTopicById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }
    const progress = judgeService.getProgress();
    const pData = progress.topicProgress[topic.id] || { solved: 0, attempted: 0, total: topic.totalProblems };

    res.json({
      success: true,
      topic: {
        ...topic,
        solvedCount: pData.solved,
        attemptedCount: pData.attempted,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET problems for a topic
dsaRouter.get('/topics/:topicId/problems', (req: Request, res: Response) => {
  try {
    const problems = problemDatabase.getProblemsByTopic(req.params.topicId);
    const enriched = problems.map(p => ({
      ...p,
      solved: judgeService.isProblemSolved(p.id),
      attempted: judgeService.isProblemAttempted(p.id),
      bookmarked: judgeService.isProblemBookmarked(p.id),
    }));

    res.json({ success: true, problems: enriched });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single problem details (Student sanitized: NO hidden tests, NO reference solutions!)
dsaRouter.get('/problems/:problemId', (req: Request, res: Response) => {
  try {
    const problem = problemDatabase.getPublicProblemById(req.params.problemId);
    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    res.json({
      success: true,
      problem: {
        ...problem,
        solved: judgeService.isProblemSolved(problem.id),
        attempted: judgeService.isProblemAttempted(problem.id),
        bookmarked: judgeService.isProblemBookmarked(problem.id),
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Run against visible test cases
dsaRouter.post('/run', async (req: Request, res: Response) => {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId || !language || code === undefined) {
      return res.status(400).json({ success: false, verdict: 'INVALID_REQUEST', error: 'Missing problemId, language, or code' });
    }

    const validLangs: SupportedLanguage[] = ['python', 'cpp', 'java', 'javascript', 'c'];
    if (!validLangs.includes(language)) {
      return res.status(400).json({ success: false, verdict: 'INVALID_REQUEST', error: `Invalid language. Supported: ${validLangs.join(', ')}` });
    }

    const problem = problemDatabase.getInternalProblemById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, verdict: 'INVALID_REQUEST', error: `Problem not found: ${problemId}` });
    }
    if (problem.status === 'draft' || problem.isDraft) {
      return res.status(400).json({
        success: false,
        verdict: 'INVALID_REQUEST',
        error: `Problem "${problem.title}" is currently in draft status and unavailable for execution.`
      });
    }

    const result = await judgeService.runProblem(problemId, language, code);
    res.json({ success: true, result });
  } catch (err: any) {
    res.status(500).json({ success: false, verdict: 'SERVER_ERROR', error: err.message });
  }
});

// POST Submit against visible + hidden tests
dsaRouter.post('/submit', async (req: Request, res: Response) => {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId || !language || code === undefined) {
      return res.status(400).json({ success: false, verdict: 'INVALID_REQUEST', error: 'Missing problemId, language, or code' });
    }

    const validLangs: SupportedLanguage[] = ['python', 'cpp', 'java', 'javascript', 'c'];
    if (!validLangs.includes(language)) {
      return res.status(400).json({ success: false, verdict: 'INVALID_REQUEST', error: `Invalid language. Supported: ${validLangs.join(', ')}` });
    }

    const problem = problemDatabase.getInternalProblemById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, verdict: 'INVALID_REQUEST', error: `Problem not found: ${problemId}` });
    }
    if (problem.status === 'draft' || problem.isDraft) {
      return res.status(400).json({
        success: false,
        verdict: 'INVALID_REQUEST',
        error: `Problem "${problem.title}" is currently in draft status and unavailable for submission.`
      });
    }

    const result = await judgeService.submitProblem(problemId, language, code);
    res.json({ success: true, result });
  } catch (err: any) {
    res.status(500).json({ success: false, verdict: 'SERVER_ERROR', error: err.message });
  }
});

// GET submissions for a problem
dsaRouter.get('/problems/:problemId/submissions', (req: Request, res: Response) => {
  try {
    const submissions = judgeService.getSubmissions(req.params.problemId);
    res.json({ success: true, submissions });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all submissions history
dsaRouter.get('/submissions', (req: Request, res: Response) => {
  try {
    const submissions = judgeService.getAllSubmissions();
    res.json({ success: true, submissions });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET user overall progress
dsaRouter.get('/progress', (req: Request, res: Response) => {
  try {
    const progress = judgeService.getProgress();
    res.json({ success: true, progress });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST toggle bookmark
dsaRouter.post('/bookmarks', (req: Request, res: Response) => {
  try {
    const { problemId } = req.body;
    if (!problemId) {
      return res.status(400).json({ success: false, error: 'problemId is required' });
    }
    const isBookmarked = judgeService.toggleBookmark(problemId);
    res.json({ success: true, bookmarked: isBookmarked });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET bookmarks list
dsaRouter.get('/bookmarks', (req: Request, res: Response) => {
  try {
    const bookmarks = judgeService.getBookmarks();
    const problemDetails = bookmarks.map(id => {
      const p = problemDatabase.getPublicProblemById(id);
      return p ? { ...p, solved: judgeService.isProblemSolved(p.id) } : null;
    }).filter(Boolean);

    res.json({ success: true, bookmarks, problems: problemDetails });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET runner health check
dsaRouter.get('/runners/health', async (req: Request, res: Response) => {
  try {
    const health = await executionService.checkRunnersHealth();
    res.json({ success: true, health });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
