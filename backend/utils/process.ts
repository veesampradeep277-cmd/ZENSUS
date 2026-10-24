import { ChildProcess, spawn } from 'child_process';

/**
 * Safely and forcefully terminates a process and all its child processes.
 * On Windows, uses `taskkill /pid <pid> /T /F` to prevent orphaned child processes.
 * On POSIX, sends SIGKILL to the process.
 */
export function killProcessTree(child: ChildProcess): void {
  if (!child || !child.pid || child.killed) {
    return;
  }

  const pid = child.pid;

  if (process.platform === 'win32') {
    try {
      const killer = spawn('taskkill', ['/pid', pid.toString(), '/T', '/F'], {
        windowsHide: true,
        stdio: 'ignore',
      });
      killer.on('error', () => {
        try {
          child.kill('SIGKILL');
        } catch {}
      });
    } catch {
      try {
        child.kill('SIGKILL');
      } catch {}
    }
  } else {
    try {
      // Try to kill process group if available, else direct process
      process.kill(-pid, 'SIGKILL');
    } catch {
      try {
        child.kill('SIGKILL');
      } catch {}
    }
  }
}
