import { rest, RestHandler } from 'msw';

const path = '/api/payment/v1/intents/:id/instruments/:instrumentId';

const fixtures = {
  success: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
