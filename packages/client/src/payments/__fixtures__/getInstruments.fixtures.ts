import { rest, RestHandler } from 'msw';
import type { Instruments } from '../types';

const path = '/api/payment/v1/intents/:id/instruments';

const fixtures = {
  success: (response: Instruments): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
