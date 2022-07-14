import { rest, RestHandler } from 'msw';
import type { UserPreferencesResponse } from '../types';

const path = '/api/account/v1/users/:userId/preferences';

const fixtures = {
  success: (response: UserPreferencesResponse): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
