import { rest, type RestHandler } from 'msw';
import type { Bag } from '../types/index.js';

const path = '/api/commerce/v1/bags/:bagId/items';

const fixtures = {
  success: (response: Bag): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
