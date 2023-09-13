import { rest, type RestHandler } from 'msw';

const path = '/api/checkout/v1/checkoutSessions/:id/promocodes';

const fixtures = {
  success: (): RestHandler =>
    rest.put(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
