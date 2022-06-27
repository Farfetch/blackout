import { rest, RestHandler } from 'msw';
import type { ProgramMembershipReplacement } from '../types';

const path =
  '/api/loyalty/v1/programs/:programId/memberships/:membershipId/replacements';

const fixtures = {
  success: (response: ProgramMembershipReplacement): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
