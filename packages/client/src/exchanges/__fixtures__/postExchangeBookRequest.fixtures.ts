import { rest, type RestHandler } from 'msw';
import type { ExchangeBookRequest } from '../index.js';

const path = '/api/account/v1/exchanges/:id/bookrequests';

const fixtures = {
  success: (response: ExchangeBookRequest): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
