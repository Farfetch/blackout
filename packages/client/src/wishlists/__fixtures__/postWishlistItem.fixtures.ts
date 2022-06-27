import { rest, RestHandler } from 'msw';
import type { Wishlist } from '../types';

const path = '/api/commerce/v1/wishlists/:wishlistId/items';

const fixtures = {
  success: (response: Wishlist): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
