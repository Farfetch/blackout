import { rest, type RestHandler } from 'msw';
import type { Raffles } from '../types';

const path = '/api/checkout/v1/raffles';

const fixtures = {
  success: (response: Raffles): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
