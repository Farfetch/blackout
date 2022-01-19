import { rest, RestHandler } from 'msw';
import type { States } from '../types';

const path = '/api/settings/v1/countries/:countryCode/states';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: Array<States>): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
