import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { ProgramMembershipReplacement } from '../types/index.js';

const path = `${defaultBaseURL}/loyalty/v1/programs/:programId/memberships/:membershipId/replacements`;

const fixtures = {
  success: (response: ProgramMembershipReplacement): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
