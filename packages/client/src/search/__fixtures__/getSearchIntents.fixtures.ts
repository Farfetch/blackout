import { rest, RestHandler } from 'msw';
import type { SearchIntents } from '../types';

const path = '/api/commerce/v1/search/intent';

export default {
  success: (response: SearchIntents): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),

  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
