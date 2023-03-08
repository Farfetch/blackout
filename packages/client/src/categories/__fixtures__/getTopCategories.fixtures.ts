import { rest, type RestHandler } from 'msw';
import type { Category } from '../types/index.js';

const path = '/api/commerce/v1/categories/top';

const fixtures = {
  success: (response: Category[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
