import { rest, type RestHandler } from 'msw';
import type { RecommendedSet } from '../types';

const path = '/api/commerce/v1/recommendedsets/:id';

const fixtures = {
  success: (response: RecommendedSet): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
