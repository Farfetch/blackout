import { rest, RestHandler } from 'msw';
import type { ProductColorGrouping } from '../types';

const path = '/api/commerce/v1/products/:id/colorgrouping';
/**
 * Response payloads.
 */
export default {
  success: (response: ProductColorGrouping): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
