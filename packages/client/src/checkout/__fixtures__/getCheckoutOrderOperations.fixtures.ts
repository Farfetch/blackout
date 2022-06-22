import { rest, RestHandler } from 'msw';
import type { GetCheckoutOrderOperationsResponse } from '../types/getCheckoutOrderOperations.types';

const path = '/api/checkout/v1/orders/:id/operations';

const fixtures = {
  success: (response: GetCheckoutOrderOperationsResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
