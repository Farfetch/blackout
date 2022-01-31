import { rest, RestHandler } from 'msw';
import type { ProductVariantMeasurement } from '../types';

const path = '/api/commerce/v1/products/:id/variantsMeasurements';
/**
 * Response payloads.
 */
export default {
  success: (response: ProductVariantMeasurement[]): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
