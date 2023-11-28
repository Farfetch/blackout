import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { GetCheckoutOrderResponse } from '../types/index.js';

const path = `${defaultBaseURL}/checkout/v1/orders/:id/tags`;

const fixtures = {
  success: (response: GetCheckoutOrderResponse): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
