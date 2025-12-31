import { FastifyReply, FastifyRequest } from 'fastify';
import { SampleUseCase } from '@use-cases/sample.usecase';

export class SampleController {
  constructor(private useCase = new SampleUseCase()) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const tenantId = (req.headers['x-tenant-id'] as string) || 'default';
    const input = req.body as any;

    try {
      const result = await this.useCase.execute({ ...input, tenantId });
      return reply.code(200).send(result);
    } catch (err) {
      return reply.code(500).send({ message: 'Internal error' });
    }
  }
}
