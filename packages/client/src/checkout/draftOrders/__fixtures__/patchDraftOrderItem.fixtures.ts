import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';

const path = `${defaultBaseURL}/checkout/v1/draftOrders/:id/items/:itemId`;

const fixtures = {
  success: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
