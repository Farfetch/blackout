import { rest, type RestHandler } from 'msw';

const path = '/api/account/v1/users/phoneTokens';

const fixtures = {
  success: (): RestHandler =>
    rest.post(path, (_req, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
