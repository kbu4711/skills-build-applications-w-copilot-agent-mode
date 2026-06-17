import app from './app';
import { connectDatabase } from './config/database';

const port = Number(process.env.PORT || 8000);

const start = async (): Promise<void> => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Octofit backend listening on http://localhost:${port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
