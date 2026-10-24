import { PythonRunner } from '../runners/python.runner';
import { CppRunner } from '../runners/cpp.runner';
import { CRunner } from '../runners/c.runner';
import { JavaRunner } from '../runners/java.runner';
import { JavaScriptRunner } from '../runners/js.runner';
import { CodeRunner, SingleExecutionResult } from '../runners/runner.interface';
import { createTempWorkspace, cleanupTempWorkspace } from '../utils/temp-files';
import { SupportedLanguage, RunnerHealthStatus } from '../../src/types/dsa.types';

export class ExecutionService {
  private runners: Map<SupportedLanguage, CodeRunner>;

  constructor() {
    this.runners = new Map<SupportedLanguage, CodeRunner>([
      ['python', new PythonRunner()],
      ['cpp', new CppRunner()],
      ['c', new CRunner()],
      ['java', new JavaRunner()],
      ['javascript', new JavaScriptRunner()],
    ]);
  }

  getRunner(language: SupportedLanguage): CodeRunner {
    const runner = this.runners.get(language);
    if (!runner) {
      throw new Error(`Unsupported programming language: ${language}`);
    }
    return runner;
  }

  async checkRunnersHealth(): Promise<RunnerHealthStatus[]> {
    const results: RunnerHealthStatus[] = [];
    const meta: Record<SupportedLanguage, { name: string; command: string }> = {
      python: { name: 'Python 3', command: 'python3' },
      cpp: { name: 'C++ (g++)', command: 'g++' },
      c: { name: 'C (gcc)', command: 'gcc' },
      java: { name: 'Java (OpenJDK)', command: 'javac & java' },
      javascript: { name: 'JavaScript (Node.js)', command: 'node' },
    };

    for (const [lang, runner] of this.runners.entries()) {
      try {
        const info = await runner.checkAvailability();
        // Also perform an actual micro-execution test
        let verified = false;
        if (info.available) {
          const ws = createTempWorkspace();
          try {
            let testCode = '';
            if (lang === 'python') testCode = 'print("GENESIS_TEST")';
            else if (lang === 'cpp') testCode = '#include <iostream>\nint main(){ std::cout << "GENESIS_TEST"; return 0; }';
            else if (lang === 'c') testCode = '#include <stdio.h>\nint main(){ printf("GENESIS_TEST"); return 0; }';
            else if (lang === 'java') testCode = 'public class Main { public static void main(String[] args){ System.out.print("GENESIS_TEST"); } }';
            else if (lang === 'javascript') testCode = 'console.log("GENESIS_TEST");';

            const execRes = await runner.execute(ws, testCode, '', 4000);
            verified = execRes.stdout.includes('GENESIS_TEST');
          } catch {
            verified = false;
          } finally {
            cleanupTempWorkspace(ws);
          }
        }

        results.push({
          language: lang,
          name: meta[lang].name,
          available: info.available,
          version: info.version,
          verified,
          command: meta[lang].command,
          notes: info.notes,
        });
      } catch (err: any) {
        results.push({
          language: lang,
          name: meta[lang].name,
          available: false,
          verified: false,
          command: meta[lang].command,
          notes: err.message,
        });
      }
    }

    return results;
  }

  async executeTestSuite(
    language: SupportedLanguage,
    code: string,
    tests: Array<{ id: string; input: string; expectedOutput: string; label?: string }>,
    timeLimitMs: number
  ): Promise<{
    runnerUnavailable?: boolean;
    unavailableReason?: string;
    compilationError?: string;
    results: Array<{
      testId: string;
      label?: string;
      input: string;
      expectedOutput: string;
      actualOutput: string;
      passed: boolean;
      runtimeMs: number;
      timedOut: boolean;
      exitCode: number | null;
      errorMessage?: string;
    }>;
  }> {
    const runner = this.getRunner(language);

    // Verify runner toolchain availability
    const avail = await runner.checkAvailability();
    if (!avail.available) {
      return {
        runnerUnavailable: true,
        unavailableReason: avail.notes || `The ${runner.language} compiler/interpreter is not installed or available in PATH.`,
        results: [],
      };
    }

    const workspace = createTempWorkspace();

    try {
      // Precompile if compiled language
      if (runner.compile) {
        const comp = await runner.compile(workspace, code);
        if (!comp.success) {
          const isMissing = comp.compilationError && (
            comp.compilationError.includes('ENOENT') ||
            comp.compilationError.includes('not found') ||
            comp.compilationError.includes('not recognized')
          );
          if (isMissing) {
            return {
              runnerUnavailable: true,
              unavailableReason: comp.compilationError,
              results: [],
            };
          }
          return {
            compilationError: comp.compilationError || 'Compilation Error',
            results: [],
          };
        }
      }

      const results = [];
      for (const test of tests) {
        const execRes: SingleExecutionResult = await runner.execute(
          workspace,
          code,
          test.input,
          timeLimitMs,
          true // precompiled
        );

        results.push({
          testId: test.id,
          label: test.label,
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: execRes.stdout,
          passed: execRes.verdict === 'ACCEPTED',
          runtimeMs: execRes.runtimeMs,
          timedOut: execRes.timedOut,
          exitCode: execRes.exitCode,
          errorMessage: execRes.errorMessage,
        });
      }

      return { results };
    } finally {
      cleanupTempWorkspace(workspace);
    }
  }
}

export const executionService = new ExecutionService();
