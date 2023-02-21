import { rest, type RestHandler } from 'msw';
import type { OrderSummaries } from '../types/orderSummary.types.js';

const path = '/api/account/v1/users/:userId/orders';

const fixtures = {
  success: (response: OrderSummaries): RestHandler =>
    rest.get(
      path,
      async (_req, res, ctx) => await res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(
      path,
      async (_req, res, ctx) =>
        await res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
