import { rest, type RestHandler } from 'msw';
import type { UserReturns } from '../types/index.js';

const path = '/api/legacy/v1/users/:userId/returns';

const fixtures = {
  success: (response: UserReturns): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
