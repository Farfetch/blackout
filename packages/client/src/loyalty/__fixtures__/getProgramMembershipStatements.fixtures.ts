import { rest, RestHandler } from 'msw';
import type { ProgramMembershipStatement } from '../types';

const path =
  '/api/loyalty/v1/programs/:programId/memberships/:membershipId/statements';

export default {
  success: (response: ProgramMembershipStatement[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
