import { rest, RestHandler } from 'msw';
import type { CommercePages } from '../types';

const path = '/api/content/v1/commercepages';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: CommercePages): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
