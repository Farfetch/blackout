import { rest, type RestHandler } from 'msw';
import type { Subscription } from '../types';

const path = '/api/marketing/v1/subscriptions';

const fixtures = {
  success: (response: Subscription[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
