import { rest, RestHandler } from 'msw';
import type { CheckoutOrderOperation } from '../types/checkoutOrderOperation.types';

const path = '/api/checkout/v1/orders/:orderId/operations/:operationId';

export default {
  success: (response: CheckoutOrderOperation): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
