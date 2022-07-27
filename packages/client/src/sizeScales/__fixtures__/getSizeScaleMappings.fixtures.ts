import { rest, RestHandler } from 'msw';
import type { SizeScaleMapping } from '../types';

const path = '/api/commerce/v1/sizeScaleMappings';

const fixtures = {
  success: (response: SizeScaleMapping): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;