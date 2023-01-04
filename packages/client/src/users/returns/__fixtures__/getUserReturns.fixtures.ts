import { rest, RestHandler } from 'msw';
import type { UserReturns } from '../types';

const path = '/api/account/v1/users/:userId/returns';

const fixtures = {
  success: (response: UserReturns): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
