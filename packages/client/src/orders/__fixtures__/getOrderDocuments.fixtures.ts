import { rest, type RestHandler } from 'msw';
import type { OrderDocument } from '../types/index.js';

const path = '/api/account/v1/orders/:orderId/documents';

const fixtures = {
  success: (response: OrderDocument[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
