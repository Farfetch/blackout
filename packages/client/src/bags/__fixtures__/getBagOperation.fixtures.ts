import { rest, type RestHandler } from 'msw';
import type { BagOperation } from '../types/index.js';

const path = '/api/commerce/v1/bags/:bagId/operations/:operationId';

const fixtures = {
  success: (response: BagOperation): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
