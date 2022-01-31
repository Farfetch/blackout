import { rest, RestHandler } from 'msw';
import type { Bag } from '../types';

const path = '/api/commerce/v1/bags/:bagId/items';

export default {
  success: (response: Bag): RestHandler =>
    rest.post(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
