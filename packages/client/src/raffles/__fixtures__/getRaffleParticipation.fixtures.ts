import { rest, type RestHandler } from 'msw';
import type { RaffleParticipation } from '../types/index.js';

const path =
  '/api/checkout/v1/raffles/:raffleId/participations/:participationId';

const fixtures = {
  success: (response: RaffleParticipation): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
