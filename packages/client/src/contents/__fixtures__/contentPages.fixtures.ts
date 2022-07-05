import { rest, RestHandler } from 'msw';
import type { ContentPages } from '../types';

const path = '/api/wl/v1/content/pages/LISTING';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: ContentPages): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
