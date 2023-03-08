import { rest, type RestHandler } from 'msw';
import type { Wishlist } from '../types/index.js';

const path = '/api/commerce/v1/wishlists/:wishlistId/items/:wishlistItemId';

const fixtures = {
  success: (response: Wishlist): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
