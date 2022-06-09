import { rest, RestHandler } from 'msw';
import type { ProgramMembership } from '../types';

const path = '/api/loyalty/v1/programs/:programId/memberships';

export default {
  success: (response: ProgramMembership): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
