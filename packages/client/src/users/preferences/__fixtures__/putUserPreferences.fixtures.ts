import { rest, type RestHandler } from 'msw';
import type { UserPreference } from '../types';

const path = '/api/account/v1/users/:userId/preferences';

const fixtures = {
  success: (response: UserPreference[]): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
