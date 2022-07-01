import { rest, RestHandler } from 'msw';
import type { PaymentIntentCharge } from '../types';

const path = '/api/payment/v1/intents/:id/charges/:chargeId';

const fixtures = {
  success: (response: PaymentIntentCharge): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
