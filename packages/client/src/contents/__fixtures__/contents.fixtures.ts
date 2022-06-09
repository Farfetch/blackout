import { rest, RestHandler } from 'msw';
import type { Contents } from '../types';

const path = '/api/content/v1/search/contents';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: Contents): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
