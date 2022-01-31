import { rest, RestHandler } from 'msw';
import type { Product } from '../types';

const path = '/api/commerce/v1/products/:id';
/**
 * Response payloads.
 */
export default {
  success: (response: Product): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
