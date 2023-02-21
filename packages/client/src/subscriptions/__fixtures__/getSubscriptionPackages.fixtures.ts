import { rest, type RestHandler } from 'msw';
import type { SubscriptionPackagesResult } from '../types';

const path = '/api/marketing/v1/subscriptionpackages';

const fixtures = {
  success: (response: SubscriptionPackagesResult): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
