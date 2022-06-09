import { rest, RestHandler } from 'msw';
import type { Set } from '../types';

const path = '/api/commerce/v1/sets/:slug';

/**
 * Response payloads.
 */
export default {
  success: (response: Set): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
