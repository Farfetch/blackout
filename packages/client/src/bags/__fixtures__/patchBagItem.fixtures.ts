import { rest, RestHandler } from 'msw';
import type { Bag } from '../types';

const path = '/api/commerce/v1/bags/:bagId/items/:bagItemId';

const fixtures = {
  success: (response: Bag): RestHandler =>
    rest.patch(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.patch(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
