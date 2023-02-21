import { rest, type RestHandler } from 'msw';

const path = '/api/account/v1/users/:userId/attributes/:attributeId';

const fixtures = {
  success: (response: number): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
