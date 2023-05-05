import { rest, type RestHandler } from 'msw';
import type { CheckoutOrderContext } from '../types/index.js';

const path = '/api/checkout/v1/orders/:checkoutOrderId/contexts/:contextId';

const fixtures = {
  success: (response: CheckoutOrderContext): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
