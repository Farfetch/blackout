import { rest, RestHandler } from 'msw';
import type { RecommendedSet } from '../types';

const path = '/api/commerce/v1/recommendedsets/:id';

/**
 * Response payloads.
 */
export default {
  success: (response: RecommendedSet): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
