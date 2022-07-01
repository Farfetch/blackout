import { rest, RestHandler } from 'msw';
import type { GetUserCreditResponse } from '../types';

const path = '/api/legacy/v1/users/:id/credits';

const fixtures = {
  success: (response: GetUserCreditResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
