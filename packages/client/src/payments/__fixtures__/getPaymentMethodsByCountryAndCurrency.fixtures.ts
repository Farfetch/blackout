import { rest, RestHandler } from 'msw';
import type { PaymentMethods } from '../types';

const path = '/api/payment/v1/paymentmethods';

export default {
  success: (response: PaymentMethods): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
