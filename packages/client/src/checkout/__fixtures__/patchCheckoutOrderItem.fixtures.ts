import { rest, RestHandler } from 'msw';

const path = '/api/checkout/v1/orders/:checkoutOrderId/items/:itemId';

export default {
  success: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
