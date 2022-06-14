import { rest, RestHandler } from 'msw';
import type { UserDefaultPersonalIdResponse } from '../types';

const path = '/api/account/v1/users/:userId/personalids/default';

const fixtures = {
  success: (response: UserDefaultPersonalIdResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
