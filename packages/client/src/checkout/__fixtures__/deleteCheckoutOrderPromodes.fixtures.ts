import { rest, type RestHandler } from 'msw';
import type { GetCheckoutOrderResponse } from '../types/getCheckoutOrderResponse.types.js';

const path = '/api/checkout/v1/orders/:checkoutOrderId/promocodes';

const fixtures = {
  success: (response: GetCheckoutOrderResponse): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
