import { rest, type RestHandler } from 'msw';
import type { RecentlyViewedProducts } from '../types/index.js';

const path = '/api/marketing/v1/recentlyViewed/products';

const fixtures = {
  success: (response: RecentlyViewedProducts): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
