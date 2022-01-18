import { rest, RestHandler } from 'msw';
import type { Translations } from '../types';

const path = '/api/language/v1/search/translations';

/**
 * Response payloads.
 */
export default {
  success: (response: Translations): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
