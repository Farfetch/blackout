import { rest, type RestHandler } from 'msw';
import type { UserLegacy } from '../types/index.js';

const path = '/api/legacy/v1/users/me';

const fixtures = {
  success: (response: UserLegacy): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
