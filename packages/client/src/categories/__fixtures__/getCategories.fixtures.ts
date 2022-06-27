import { rest, RestHandler } from 'msw';
import type { Category } from '../types';

const path = '/api/commerce/v1/categories';

const fixtures = {
  success: (response: Category[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
