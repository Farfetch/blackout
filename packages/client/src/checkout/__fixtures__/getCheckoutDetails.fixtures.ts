import { rest, RestHandler } from 'msw';
import type { GetCheckoutDetailsResponse } from '../types';

const path = '/api/checkout/v1/orders/:id/details';

const fixtures = {
  success: (response: GetCheckoutDetailsResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
