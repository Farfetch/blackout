import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/orders/:orderId/items/:orderItemId/activities';

const fixtures = {
  success: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
