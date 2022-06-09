import { rest, RestHandler } from 'msw';
import type { Countries } from '../types';

const path = '/api/settings/v1/countries';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: Array<Countries>): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
