import { rest, RestHandler } from 'msw';
import type { OrderDocuments } from '../types';

const path = '/api/account/v1/orders/:orderId/documents';

export default {
  success: (response: OrderDocuments): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
