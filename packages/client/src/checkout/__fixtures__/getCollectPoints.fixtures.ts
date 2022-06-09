import { rest, RestHandler } from 'msw';
import type { CollectPoint } from '../types';

const path = '/api/checkout/v1/collectpoints';

export default {
  success: (response: CollectPoint): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
