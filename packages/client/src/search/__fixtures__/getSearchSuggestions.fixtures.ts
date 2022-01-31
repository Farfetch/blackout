import { rest, RestHandler } from 'msw';
import type { SearchSuggestion } from '../types';

const path = '/api/commerce/v1/search/suggestions';

export default {
  success: (response: SearchSuggestion[]): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
