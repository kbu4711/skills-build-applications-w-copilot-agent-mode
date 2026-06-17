import express from 'express';
import rateLimit from 'express-rate-limit';
import { apiRouter } from './routes/api';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';

app.use(express.json());
app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false
  })
);
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'Octofit Tracker API',
    apiBaseUrl: `${baseUrl}/api`
  });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : 'Unexpected error';
  res.status(500).json({ error: message });
});

export default app;
