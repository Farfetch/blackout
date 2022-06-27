import { rest, RestHandler } from 'msw';
import type { GetCheckoutResponse } from '../types';

const path = '/api/checkout/v1/orders/:id/tags';

const fixtures = {
  success: (response: GetCheckoutResponse): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
