import { rest, type RestHandler } from 'msw';

const path = '/api/account/v1/orders/:orderId/documents/:fileId';

const fixtures = {
  success: (response: string): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
