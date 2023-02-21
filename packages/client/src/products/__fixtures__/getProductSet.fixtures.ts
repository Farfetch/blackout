import { rest, type RestHandler } from 'msw';
import type { ProductSet } from '../types';

const path = '/api/commerce/v1/sets/:slug';

const fixtures = {
  success: (response: ProductSet): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
