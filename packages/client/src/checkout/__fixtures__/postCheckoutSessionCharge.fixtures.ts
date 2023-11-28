import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { CheckoutSessionCharge } from '../types/index.js';

const path = `${defaultBaseURL}/checkout/v1/checkoutSessions/:id/charges`;

const fixtures = {
  success: (response: CheckoutSessionCharge): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
