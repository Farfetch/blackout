import { rest, RestHandler } from 'msw';

const URL = '/api/checkout/v1/orders/:checkoutOrderId/items/:itemId';

export default {
  success: (): RestHandler =>
    rest.delete(URL, (_, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.delete(URL, (_, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
