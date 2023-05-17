import { rest, type RestHandler } from 'msw';
import type { SharedWishlist } from '../types/index.js';

const path = '/api/commerce/v1/sharedWishlists';

const fixtures = {
  success: (response: SharedWishlist): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
