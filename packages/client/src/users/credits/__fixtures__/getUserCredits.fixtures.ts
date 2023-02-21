import { rest, type RestHandler } from 'msw';
import type { UserCredit } from '../types';

const path = '/api/account/v1/users/:id/credits';

const fixtures = {
  success: (response: UserCredit[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
