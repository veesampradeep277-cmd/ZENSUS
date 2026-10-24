import { JudgeVerdict } from '../../src/types/dsa.types';

export interface CompilationResult {
  success: boolean;
  compilationError?: string;
}

export interface SingleExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  runtimeMs: number;
  memoryMb?: number;
  timedOut: boolean;
  verdict: JudgeVerdict;
  errorMessage?: string;
}

export interface CodeRunner {
  language: string;
  checkAvailability(): Promise<{ available: boolean; version?: string; notes?: string }>;
  compile?(workspacePath: string, code: string): Promise<CompilationResult>;
  execute(
    workspacePath: string,
    code: string,
    input: string,
    timeLimitMs: number,
    isPrecompiled?: boolean
  ): Promise<SingleExecutionResult>;
}
