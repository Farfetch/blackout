import { rest, RestHandler } from 'msw';
import type { ContentTypes } from '../types';

const path = '/api/content/v1/spaces/:spaceCode/contentTypes';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: ContentTypes): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
