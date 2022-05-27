import { rest, RestHandler } from 'msw';
import type { CheckoutOrderOperation } from '../types/checkoutOrderOperation.types';

const URL = '/api/checkout/v1/orders/:orderId/operations/:operationId';

export default {
  success: (params: { response: CheckoutOrderOperation }): RestHandler =>
    rest.get(URL, (_, res, ctx) =>
      res(ctx.status(200), ctx.json(params.response)),
    ),
  failure: (): RestHandler =>
    rest.get(URL, (_, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
