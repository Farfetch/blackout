import { rest, type RestHandler } from 'msw';
import type { ProgramMembershipStatement } from '../types/index.js';

const path =
  '/api/loyalty/v1/programs/:programId/memberships/:membershipId/statements';

const fixtures = {
  success: (response: ProgramMembershipStatement[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
