import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { PostCheckoutOrderContextResponse } from '../types/index.js';

const path = `${defaultBaseURL}/checkout/v1/orders/:checkoutOrderId/contexts`;

const fixtures = {
  success: (response: PostCheckoutOrderContextResponse): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json(response.data),
        ctx.set({
          location:
            'http://localhost:3000/checkout/v1/orders/15338048/contexts/3fa85f64-5717-4562-b3fc-2c963f66afa6',
        }),
      ),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
