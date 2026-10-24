import os from 'os';

/**
 * Strips sensitive environment variables from execution sub-processes
 * so student code can never read host secrets, API keys, or database credentials,
 * while ensuring required system variables exist across Windows and POSIX.
 */
export function getSanitizedEnv(): NodeJS.ProcessEnv {
  const isWin = process.platform === 'win32';
  const baseEnv: NodeJS.ProcessEnv = {
    PATH: process.env.PATH || '',
    PYTHONUNBUFFERED: '1',
    NODE_ENV: 'production',
  };

  if (isWin) {
    // Prioritize genuine GCC/MinGW toolchain directories on Windows so they are not masked by other tools
    const rawPath = process.env.PATH || '';
    const pathSegments = rawPath.split(';').filter(Boolean);
    const mingwSegments = pathSegments.filter(p => {
      const lower = p.toLowerCase();
      return lower.includes('msys64') || lower.includes('mingw') || lower.includes('ucrt64');
    });
    const otherSegments = pathSegments.filter(p => {
      const lower = p.toLowerCase();
      return !lower.includes('msys64') && !lower.includes('mingw') && !lower.includes('ucrt64');
    });
    // If standard MSYS2 UCRT64 exists but is not in PATH, add it
    const defaultMsys = 'C:\\msys64\\ucrt64\\bin';
    if (!mingwSegments.some(p => p.toLowerCase().includes('ucrt64')) && os.platform() === 'win32') {
      try {
        if (require('fs').existsSync(defaultMsys)) {
          mingwSegments.unshift(defaultMsys);
        }
      } catch {}
    }
    baseEnv.PATH = [...mingwSegments, ...otherSegments].join(';');

    baseEnv.SystemRoot = process.env.SystemRoot || process.env.SYSTEMROOT || 'C:\\Windows';
    baseEnv.SYSTEMROOT = baseEnv.SystemRoot;
    baseEnv.windir = process.env.windir || 'C:\\Windows';
    baseEnv.TEMP = process.env.TEMP || os.tmpdir();
    baseEnv.TMP = process.env.TMP || os.tmpdir();
    baseEnv.USERPROFILE = process.env.USERPROFILE || process.env.HOME || '';
    baseEnv.LOCALAPPDATA = process.env.LOCALAPPDATA || '';
    baseEnv.APPDATA = process.env.APPDATA || '';
    baseEnv.PATHEXT = process.env.PATHEXT || '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC';
  } else {
    baseEnv.LANG = 'en_US.UTF-8';
    baseEnv.LC_ALL = 'en_US.UTF-8';
    baseEnv.HOME = '/tmp';
  }

  return baseEnv;
}

export const MAX_OUTPUT_SIZE = 1024 * 1024; // 1MB max stdout/stderr to prevent memory exhaustion

