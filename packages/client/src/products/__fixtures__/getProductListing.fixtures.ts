import { rest, type RestHandler } from 'msw';
import type { ProductListing } from '../types/index.js';

const path = '/api/commerce/v1/listing/*';

const fixtures = {
  success: (response: ProductListing): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
