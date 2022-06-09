import { rest, RestHandler } from 'msw';
import type { Return } from '../types/return.types';

const path = '/api/account/v1/orders/:orderId/returns';

export default {
  success: (response: Return): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
