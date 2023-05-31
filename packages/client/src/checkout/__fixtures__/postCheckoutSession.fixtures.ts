import { rest, type RestHandler } from 'msw';
import type { CheckoutSession } from '../types/index.js';

const path = '/api/checkout/v1/checkoutSessions';

const fixtures = {
  success: (response: CheckoutSession): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
