import { rest, type RestHandler } from 'msw';
import type { PostPaymentIntentChargeResponse } from '../types';

const path = '/api/payment/v1/intents/:id/charges';

const fixtures = {
  success: (response: PostPaymentIntentChargeResponse): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json(response.data),
        ctx.set({
          location:
            'http://localhost:9699/v1/intents/acb66f64-b2af-4ad5-8d32-d2323cc535f8/charges/43b059df-898e-4407-8347-b075b645bf6c',
        }),
      ),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
