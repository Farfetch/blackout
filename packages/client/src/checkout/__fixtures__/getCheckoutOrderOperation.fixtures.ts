import { rest, type RestHandler } from 'msw';
import type { CheckoutOrderOperation } from '../types';

const URL = '/api/checkout/v1/orders/:orderId/operations/:operationId';

const fixtures = {
  success: (response: CheckoutOrderOperation): RestHandler =>
    rest.get(URL, (_, res, ctx) => res(ctx.status(200), ctx.json(response))),
  failure: (): RestHandler =>
    rest.get(URL, (_, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
