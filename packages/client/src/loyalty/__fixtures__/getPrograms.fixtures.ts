import { rest, RestHandler } from 'msw';
import type { Program } from '../types';

const path = '/api/loyalty/v1/programs';

const fixtures = {
  success: (response: Program[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
