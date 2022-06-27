import { rest, RestHandler } from 'msw';
import type { WishlistSet } from '../types';

const path = '/api/commerce/v1/wishlists/:wishlistId/sets/:wishlistSetId';

export default {
  success: (response: WishlistSet): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
