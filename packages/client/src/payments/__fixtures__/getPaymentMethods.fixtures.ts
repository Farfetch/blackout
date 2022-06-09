import { rest, RestHandler } from 'msw';
import type { PaymentMethod } from '../types';

const path = '/api/checkout/v1/orders/:id';

export default {
  success: (response: PaymentMethod): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
