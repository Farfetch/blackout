import { rest, RestHandler } from 'msw';
import type { Category } from '../types';

const path = '/api/commerce/v1/categories/top';

export default {
  success: (response: Category[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
