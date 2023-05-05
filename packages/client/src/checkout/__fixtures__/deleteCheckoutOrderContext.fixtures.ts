import { rest, type RestHandler } from 'msw';

const path = '/api/checkout/v1/orders/:checkoutOrderId/contexts/:contextId';

const fixtures = {
  success: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          '@controls': null,
        }),
      ),
    ),
  failure: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
