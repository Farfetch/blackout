import { rest, RestHandler } from 'msw';

const path = 'https://api.blackandwhite-ff.com/authentication/v1/tokens/:id';

const fixtures = {
  success: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
