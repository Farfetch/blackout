import { rest, RestHandler } from 'msw';
import type { Wishlist } from '../types';

const path = '/api/commerce/v1/wishlists/:wishlistId';

export default {
  success: (response: Wishlist): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
