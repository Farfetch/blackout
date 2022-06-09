import { rest, RestHandler } from 'msw';
import type { SubscriptionPackagesResult } from '../types';

const path = '/api/marketing/v1/subscriptionpackages';

export default {
  success: (response: SubscriptionPackagesResult): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
