import { rest, type RestHandler } from 'msw';
import type { ExchangeBookRequest } from '../types/index.js';

const path = '/api/account/v1/exchanges/:id/bookrequests/:bookRequestId';

const fixtures = {
  success: (response: ExchangeBookRequest): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
