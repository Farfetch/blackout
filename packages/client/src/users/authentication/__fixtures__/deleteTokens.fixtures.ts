import { rest, type RestHandler } from 'msw';

const path = '/api/authentication/v1/tokens/:id';

const fixtures = {
  success: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
