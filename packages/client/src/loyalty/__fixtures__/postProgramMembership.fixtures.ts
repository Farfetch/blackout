import { rest, type RestHandler } from 'msw';
import type { ProgramMembership } from '../types/index.js';

const path = '/api/loyalty/v1/programs/:programId/memberships';

const fixtures = {
  success: (response: ProgramMembership): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
