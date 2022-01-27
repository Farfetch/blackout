import { rest, RestHandler } from 'msw';
import type { WishlistSet } from '../types';

const path = '/api/commerce/v1/wishlists/:wishlistId/sets';

export default {
  success: (response: WishlistSet): RestHandler =>
    rest.post(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
