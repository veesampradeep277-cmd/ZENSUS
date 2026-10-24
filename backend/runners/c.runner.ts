import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { CodeRunner, CompilationResult, SingleExecutionResult } from './runner.interface';
import { getSanitizedEnv, MAX_OUTPUT_SIZE } from '../utils/security';
import { killProcessTree } from '../utils/process';

export class CRunner implements CodeRunner {
  language = 'c';

  async checkAvailability(): Promise<{ available: boolean; version?: string; notes?: string }> {
    return new Promise((resolve) => {
      const proc = spawn('gcc', ['--version'], { env: getSanitizedEnv() });
      let out = '';
      proc.stdout.on('data', d => out += d.toString());
      proc.stderr.on('data', d => out += d.toString());
      proc.on('error', (err) => {
        resolve({ available: false, notes: `gcc compiler not found: ${err.message}` });
      });
      proc.on('close', (code) => {
        if (code === 0) {
          const firstLine = out.split('\n')[0] || 'gcc';
          resolve({ available: true, version: firstLine.trim() });
        } else {
          resolve({ available: false, notes: `gcc check exited with code ${code}` });
        }
      });
    });
  }

  async compile(workspacePath: string, code: string): Promise<CompilationResult> {
    const srcPath = path.join(workspacePath, 'solution.c');
    const binName = process.platform === 'win32' ? 'solution.exe' : 'solution';
    const outPath = path.join(workspacePath, binName);
    fs.writeFileSync(srcPath, code, 'utf8');

    return new Promise((resolve) => {
      let stderr = '';
      const child = spawn('gcc', ['-O2', '-std=c11', 'solution.c', '-o', binName], {
        cwd: workspacePath,
        env: getSanitizedEnv(),
      });

      child.stderr.on('data', d => stderr += d.toString());

      child.on('error', (err) => {
        resolve({
          success: false,
          compilationError: `C compiler (gcc) not found in system PATH: ${err.message}. Please install MinGW-w64 or GCC to compile C code.`
        });
      });

      child.on('close', (code) => {
        if (code === 0 && fs.existsSync(outPath)) {
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            compilationError: stderr.trim() || `C compilation failed with exit code ${code}`,
          });
        }
      });
    });
  }

  async execute(
    workspacePath: string,
    code: string,
    input: string,
    timeLimitMs: number,
    isPrecompiled: boolean = false
  ): Promise<SingleExecutionResult> {
    const binName = process.platform === 'win32' ? 'solution.exe' : 'solution';
    const binPath = path.join(workspacePath, binName);
    const runCmd = process.platform === 'win32' ? binPath : './solution';

    if (!isPrecompiled) {
      const comp = await this.compile(workspacePath, code);
      if (!comp.success) {
        return {
          stdout: '',
          stderr: comp.compilationError || 'Compilation Error',
          exitCode: 1,
          runtimeMs: 0,
          timedOut: false,
          verdict: 'COMPILATION_ERROR',
          errorMessage: comp.compilationError,
        };
      }
    }

    return new Promise((resolve) => {
      const startTime = process.hrtime.bigint();
      let timedOut = false;
      let stdout = '';
      let stderr = '';

      const child = spawn(runCmd, [], {
        cwd: workspacePath,
        env: getSanitizedEnv(),
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const timer = setTimeout(() => {
        timedOut = true;
        killProcessTree(child);
      }, timeLimitMs);

      child.stdout.on('data', (data) => {
        if (stdout.length < MAX_OUTPUT_SIZE) {
          stdout += data.toString();
        }
      });

      child.stderr.on('data', (data) => {
        if (stderr.length < MAX_OUTPUT_SIZE) {
          stderr += data.toString();
        }
      });

      if (input) {
        child.stdin.write(input);
      }
      child.stdin.end();

      child.on('error', (err) => {
        clearTimeout(timer);
        const duration = Number(process.hrtime.bigint() - startTime) / 1e6;
        resolve({
          stdout,
          stderr: err.message,
          exitCode: 1,
          runtimeMs: Math.round(duration),
          timedOut: false,
          verdict: 'RUNTIME_ERROR',
          errorMessage: err.message,
        });
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        const duration = Number(process.hrtime.bigint() - startTime) / 1e6;
        const runtimeMs = Math.round(duration);

        if (timedOut) {
          return resolve({
            stdout,
            stderr: `Time Limit Exceeded (${timeLimitMs}ms)`,
            exitCode: null,
            runtimeMs: timeLimitMs,
            timedOut: true,
            verdict: 'TIME_LIMIT_EXCEEDED',
            errorMessage: 'Time Limit Exceeded',
          });
        }

        if (code !== 0) {
          return resolve({
            stdout,
            stderr,
            exitCode: code,
            runtimeMs,
            timedOut: false,
            verdict: 'RUNTIME_ERROR',
            errorMessage: stderr.trim() || `Process exited with error code ${code}`,
          });
        }

        resolve({
          stdout,
          stderr,
          exitCode: 0,
          runtimeMs,
          timedOut: false,
          verdict: 'ACCEPTED',
        });
      });
    });
  }
}
