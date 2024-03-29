import { rest, type RestHandler } from 'msw';
import type { PaymentMethods } from '../../payments/types/index.js';

const path = '/api/checkout/v1/orders/:id';

const fixtures = {
  success: (response: PaymentMethods): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
