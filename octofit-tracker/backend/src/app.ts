import express from 'express';
import { apiRouter } from './routes/api';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';

app.use(express.json());
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
