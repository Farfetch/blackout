import { rest, RestHandler } from 'msw';
import type { GetOperationsResponse } from '../types/getOperations.types';

const path = '/api/checkout/v1/orders/:id/operations';

export default {
  success: (response: GetOperationsResponse): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
