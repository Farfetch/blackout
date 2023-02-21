import { rest, type RestHandler } from 'msw';

const path = '/api/payment/v1/intents/:id/instruments/:instrumentId';

const fixtures = {
  success: (): RestHandler =>
    rest.put(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
