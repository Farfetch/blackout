import { rest, RestHandler } from 'msw';
import type { SearchDidYouMeanSuggestion } from '../types';

const path = '/api/commerce/v1/search/didyoumean';

const fixtures = {
  success: (response: SearchDidYouMeanSuggestion[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
