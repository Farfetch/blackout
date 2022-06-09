import { rest, RestHandler } from 'msw';
import type { Currencies } from '../types';

const path = '/api/settings/v1/countries/:countryCode/currencies';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (response: Array<Currencies>): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
