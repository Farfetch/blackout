import { rest, RestHandler } from 'msw';
import type { Listing } from '../types';

const path = '/api/commerce/v1/listing/*';

const fixtures = {
  success: (response: Listing): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
