import { rest, type RestHandler } from 'msw';
import type { ProductFitting } from '../types/index.js';

const path = '/api/commerce/v1/products/:productId/fittings';

const fixtures = {
  success: (response: ProductFitting[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
