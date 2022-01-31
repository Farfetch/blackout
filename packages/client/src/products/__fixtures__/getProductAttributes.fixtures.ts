import { rest, RestHandler } from 'msw';
import type { ProductAttribute } from '../types';

const path = '/api/commerce/v1/products/:id/attributes';
/**
 * Response payloads.
 */
export default {
  success: (response: ProductAttribute[]): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
