import { rest, type RestHandler } from 'msw';
import type { User } from '../types/index.js';

const path = '/api/account/v1/users';

const fixtures = {
  success: (response: User): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
