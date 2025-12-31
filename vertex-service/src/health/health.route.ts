import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: '{{serviceName}}'
  });
});

router.get('/readiness', (req: Request, res: Response) => {
  res.json({
    ready: true,
    timestamp: new Date().toISOString()
  });
});

export default router;
