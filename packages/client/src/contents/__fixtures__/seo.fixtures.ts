import { rest, RestHandler } from 'msw';
import type { SEOMetadata } from '../types';

const path = '/api/seo/metadata';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: SEOMetadata): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
