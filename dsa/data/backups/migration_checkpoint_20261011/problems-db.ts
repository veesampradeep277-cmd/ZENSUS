import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DSA_TOPICS_CONFIG } from '../config/topics';
import {
  InternalProblemDefinition,
  ProblemDetail,
  ProblemSummary,
  SupportedLanguage,
} from '../../src/types/dsa.types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateStarterCode(
  title: string,
  inputHint: string = 'standard input',
  outputHint: string = 'standard output'
): Record<SupportedLanguage, string> {
  return {
    python: `class Solution:
    def solve(self):
        pass
`,
    cpp: `class Solution {
public:
    void solve() {
        
    }
};
`,
    java: `class Solution {
    public void solve() {
        
    }
}
`,
    javascript: `/**
 * @return {void}
 */
var solve = function() {
    
};
`,
  };
}

export class ProblemDatabase {
  private problems: Map<string, InternalProblemDefinition> = new Map();
  private topicProblemMap: Map<string, string[]> = new Map();
  private topics = DSA_TOPICS_CONFIG;

  constructor() {
    this.loadCatalog();
  }

  private loadCatalog() {
    try {
      const catalogPath = path.resolve(__dirname, 'authentic-catalog.json');
      if (fs.existsSync(catalogPath)) {
        const raw = fs.readFileSync(catalogPath, 'utf8');
        const data = JSON.parse(raw);

        // Load all unique problems
        const pById = data.problemsById || {};
        for (const [id, prob] of Object.entries<any>(pById)) {
          const internalProb: InternalProblemDefinition = {
            ...prob,
            hiddenTests: [], // Authentic dataset has no hidden tests
          };
          this.problems.set(id, internalProb);
        }

        // Load topic problem mappings
        const pByTopic = data.problemsByTopic || {};
        for (const [topicId, list] of Object.entries<any[]>(pByTopic)) {
          this.topicProblemMap.set(
            topicId,
            list.map((p) => p.id)
          );
        }
      }
    } catch (err) {
      console.error('Failed to load authentic-catalog.json:', err);
    }
  }

  getAllTopics(): typeof DSA_TOPICS_CONFIG {
    return this.topics;
  }

  getTopicById(topicId: string) {
    return this.topics.find((t) => t.id === topicId || t.slug === topicId);
  }

  getProblemsByTopic(topicId: string): ProblemSummary[] {
    const topic = this.getTopicById(topicId);
    if (!topic) return [];
    const ids = this.topicProblemMap.get(topic.id) || [];
    const result: ProblemSummary[] = [];

    for (const id of ids) {
      const p = this.problems.get(id);
      if (p) {
        result.push({
          id: p.id,
          topicId: topic.id,
          topicTitle: topic.title,
          order: p.order,
          title: p.title,
          difficulty: p.difficulty,
          progressionStage: p.progressionStage,
          tags: p.tags,
          executionType: p.executionType,
          status: p.status,
          isDraft: p.isDraft,
        });
      }
    }
    return result;
  }

  /**
   * Returns sanitized problem for student frontend.
   * NEVER exposes hidden tests, reference solutions, hints, or judge secrets!
   */
  getPublicProblemById(problemId: string): ProblemDetail | null {
    const p = this.problems.get(problemId);
    if (!p) return null;

    return {
      id: p.id,
      topicId: p.topicId,
      topicTitle: p.topicTitle,
      order: p.order,
      title: p.title,
      difficulty: p.difficulty,
      progressionStage: p.progressionStage,
      tags: p.tags,
      executionType: p.executionType,
      status: p.status,
      isDraft: p.isDraft,
      description: p.description,
      inputFormat: p.inputFormat,
      outputFormat: p.outputFormat,
      constraints: p.constraints,
      examples: p.examples,
      visibleTests: p.visibleTests,
      starterCode: p.starterCode,
      timeLimitMs: p.timeLimitMs,
      memoryLimitMb: p.memoryLimitMb,
    };
  }

  /**
   * Internal method for Judge Service only.
   */
  getInternalProblemById(problemId: string): InternalProblemDefinition | null {
    return this.problems.get(problemId) || null;
  }

  getTotalProblemsCount(): number {
    return this.problems.size;
  }
}

export const problemDatabase = new ProblemDatabase();
