import { rest, RestHandler } from 'msw';
import type { SizeScale } from '../types';

const path = '/api/commerce/v1/sizeScales/:id';

const fixtures = {
  success: (response: SizeScale): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
