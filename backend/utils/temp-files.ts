import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export function createTempWorkspace(): string {
  const dirName = `genesis_run_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`;
  const dirPath = path.join(os.tmpdir(), dirName);
  fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

export function cleanupTempWorkspace(dirPath: string): void {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  } catch (err) {
    console.warn(`Failed to cleanup temp workspace ${dirPath}:`, err);
  }
}
