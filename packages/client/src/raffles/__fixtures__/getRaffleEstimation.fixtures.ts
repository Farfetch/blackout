import { rest, RestHandler } from 'msw';
import type { RaffleEstimation } from '../types';

const path = '/api/checkout/v1/raffles/:raffleId/estimation';

const fixtures = {
  success: (response: RaffleEstimation): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
