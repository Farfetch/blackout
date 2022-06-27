import { rest, RestHandler } from 'msw';

const path = '/api/legacy/v1/account/password/retrieve';

const fixtures = {
  success: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
