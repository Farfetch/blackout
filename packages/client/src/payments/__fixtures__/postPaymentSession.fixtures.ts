import { rest, type RestHandler } from 'msw';
import type { PaymentSession } from '../index.js';

const path = '/api/payment/v1/paymentsession';

const fixtures = {
  success: (response: PaymentSession): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
