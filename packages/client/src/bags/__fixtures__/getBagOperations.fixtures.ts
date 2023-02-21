import { rest, type RestHandler } from 'msw';
import type { BagOperations } from '../types';

const path = '/api/commerce/v1/bags/:bagId/operations';

const fixtures = {
  success: (response: BagOperations): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
