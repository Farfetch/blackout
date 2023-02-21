import { rest, type RestHandler } from 'msw';
import type { CheckoutOrderDetails } from '../types';

const path = '/api/checkout/v1/orders/:id/details';

const fixtures = {
  success: (response: CheckoutOrderDetails): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
