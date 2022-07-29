import { rest, RestHandler } from 'msw';
import type { LoginResponse } from '../types';

const path = '/api/account/v1/users';

const fixtures = {
  success: (response: LoginResponse): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
