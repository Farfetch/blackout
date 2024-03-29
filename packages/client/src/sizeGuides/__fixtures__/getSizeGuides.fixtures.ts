import { rest, type RestHandler } from 'msw';
import type { SizeGuide } from '../types/index.js';

const path = '/api/commerce/v1/sizeGuides';

const fixtures = {
  success: (response: SizeGuide[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
