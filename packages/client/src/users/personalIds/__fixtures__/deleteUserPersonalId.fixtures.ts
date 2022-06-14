import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/users/:userId/personalIds/:personalId';

const fixtures = {
  success: (response: number): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
