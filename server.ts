import express from 'express';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { dsaRouter } from './backend/routes/dsa.routes';
import { executionService } from './backend/services/execution.service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Enable CORS for development and cross-origin tools
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json({ limit: '10mb' }));

  // Mount DSA API endpoints
  app.use('/api/dsa', dsaRouter);

  // System Health
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'zensus-execution-engine',
      timestamp: new Date().toISOString(),
      port: PORT,
      cors: true
    });
  });

  // Serve static files from workspace root (dashboard.html, coding-problems/, etc.)
  app.use(express.static(path.resolve(__dirname)));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Pre-validate toolchains at startup (non-fatal, logged clearly)
  try {
    const health = await executionService.checkRunnersHealth();
    console.log('--- ZENSUS Toolchain Discovery ---');
    for (const h of health) {
      const mark = h.verified ? '✓' : h.available ? '⚠' : '✗';
      console.log(`  [${mark}] ${h.name}: ${h.verified ? 'Verified Ready' : h.available ? 'Installed' : 'Unavailable'}`);
    }
  } catch (err: any) {
    console.warn('Warning: Toolchain startup check could not complete:', err.message);
  }

  const server = http.createServer(app);

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n[FATAL] Port ${PORT} is already in use by another process.`);
      console.error(`Please terminate the existing process or run: npx kill-port ${PORT}\n`);
      process.exit(1);
    } else {
      console.error('Server failed with error:', err);
      process.exit(1);
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`  ZENSUS DSA Server running at http://localhost:${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  Runners:      http://localhost:${PORT}/api/dsa/runners/health`);
    console.log(`======================================================\n`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
