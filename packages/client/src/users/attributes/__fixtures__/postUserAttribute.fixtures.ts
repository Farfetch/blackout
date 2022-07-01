import { rest, RestHandler } from 'msw';
import type { UserAttribute } from '../types';

const path = '/api/account/v1/users/:userId/attributes';

const fixtures = {
  success: (response: UserAttribute): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
