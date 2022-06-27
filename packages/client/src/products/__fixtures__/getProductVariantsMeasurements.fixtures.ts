import { rest, RestHandler } from 'msw';
import type { ProductVariantMeasurement } from '../types';

const path = '/api/commerce/v1/products/:id/variantsMeasurements';

const fixtures = {
  success: (response: ProductVariantMeasurement[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
