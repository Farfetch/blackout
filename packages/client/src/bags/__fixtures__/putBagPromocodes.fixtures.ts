import { rest, type RestHandler } from 'msw';
import type { BagPromocodesInformation } from '../types';

const path = '/api/commerce/v1/bags/:bagId/promocodes';

const fixtures = {
  success: (response: BagPromocodesInformation): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
