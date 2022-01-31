import { rest, RestHandler } from 'msw';
import type { Bag } from '../types';

const path = '/api/commerce/v1/bags/:bagId';

export default {
  success: (response: Bag): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
