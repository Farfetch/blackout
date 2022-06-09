import { rest, RestHandler } from 'msw';
import type { GetCreditResponse } from '../types';

const path = '/api/legacy/v1/users/:id/credits';

export default {
  success: (response: GetCreditResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
