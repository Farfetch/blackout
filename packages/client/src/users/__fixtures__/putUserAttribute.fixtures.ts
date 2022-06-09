import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/users/:userId/attributes/:attributeId';

export default {
  success: (response: number): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
