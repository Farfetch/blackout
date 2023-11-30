import { rest, type RestHandler } from 'msw';
import type { DraftOrder } from '../types/index.js';

const path = '/api/checkout/v1/draftOrders/:draftOrderId';

const fixtures = {
  success: (response: DraftOrder): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),

  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
