import { rest, RestHandler } from 'msw';
import type { ProgramMembership } from '../types';

const path = '/api/loyalty/v1/programs/:programId/users/membership';

export default {
  success: (response: ProgramMembership): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
