import { rest, RestHandler } from 'msw';
import type { Subscription } from '../types';

const path = '/api/marketing/v1/subscriptions';

export default {
  success: (response: Subscription[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
