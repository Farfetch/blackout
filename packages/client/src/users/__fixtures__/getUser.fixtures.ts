import { rest, RestHandler } from 'msw';
import type { GetUserResponse } from '../types';

const path = '/api/account/v1/users/me';

export default {
  success: (response: GetUserResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
