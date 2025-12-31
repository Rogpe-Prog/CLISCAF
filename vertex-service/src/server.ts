import express, { Express, Request, Response } from 'express';
import healthRouter from './health/health.route';

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('/health', healthRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({
    service: '{{serviceName}}',
    status: 'running',
    version: '1.0.0'
  });
});

export default app;
