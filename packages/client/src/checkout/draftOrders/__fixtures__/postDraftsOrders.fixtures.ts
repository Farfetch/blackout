import { rest, type RestHandler } from 'msw';
import type { DraftOrder } from '../types/index.js';

const path = '/api/checkout/v1/draftOrders';

const fixtures = {
  success: (response: DraftOrder): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
