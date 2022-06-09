import { rest, RestHandler } from 'msw';
import type { SizeGuide } from '../types';

const path = '/api/commerce/v1/sizeGuides';

export default {
  success: (response: SizeGuide[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
