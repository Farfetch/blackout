import { rest, RestHandler } from 'msw';
import type { GetUserCreditMovementsResponse } from '../types';

const path = '/api/legacy/v1/users/:id/creditMovements';

const fixtures = {
  success: (response: GetUserCreditMovementsResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
