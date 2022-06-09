import { rest, RestHandler } from 'msw';

const path = '/api/marketing/v1/recentlyViewed/products/:id';

export default {
  success: (response: Record<string, unknown>): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
