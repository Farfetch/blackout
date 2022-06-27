import { rest, RestHandler } from 'msw';

const path = '/api/authentication/v1/userImpersonations/:id';

export default {
  success: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
