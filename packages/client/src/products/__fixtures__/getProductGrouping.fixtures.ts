import { rest, RestHandler } from 'msw';
import type { ProductGrouping } from '../types';

const path = '/api/commerce/v1/products/:id/grouping';
/**
 * Response payloads.
 */
export default {
  success: (response: ProductGrouping): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
