import { rest, RestHandler } from 'msw';

const path = '/api/marketing/v1/subscriptions';

export default {
  success: (response: Record<string, unknown>): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
