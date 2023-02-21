import { rest, type RestHandler } from 'msw';
import type { ContentPage } from '../types';

const path = '/api/wl/v1/content/pages/LISTING';

/**
 * Response payloads.
 */
const fixtures = {
  get: {
    success: (response: ContentPage): RestHandler =>
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};

export default fixtures;
