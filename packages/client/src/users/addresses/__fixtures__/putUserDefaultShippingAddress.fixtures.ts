import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/users/:userId/addresses/shipping/:id';

const fixtures = {
  success: (): RestHandler =>
    rest.put(path, async (_req, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
