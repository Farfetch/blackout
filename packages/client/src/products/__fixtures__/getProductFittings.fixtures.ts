import { rest, RestHandler } from 'msw';
import type { ProductFitting } from '../types';

const path = '/api/commerce/v1/products/:productId/fittings';

/**
 * Response payloads.
 */
export default {
  success: (response: ProductFitting[]): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
