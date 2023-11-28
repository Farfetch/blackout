import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { Controls } from '../../index.js';

const path = `${defaultBaseURL}/checkout/v1/orders/:checkoutOrderId/items/:itemId`;

const fixtures = {
  success: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.status(200))),
  successWithData: (response: Controls): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.json(response))),
  failure: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
