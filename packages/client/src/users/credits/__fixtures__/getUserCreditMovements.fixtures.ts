import { rest, type RestHandler } from 'msw';
import type { PagedResponse } from '../../../types/index.js';
import type { UserCreditMovement } from '../types/index.js';

const path = '/api/account/v1/users/:id/creditMovements';

const fixtures = {
  success: (response: PagedResponse<UserCreditMovement>): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
