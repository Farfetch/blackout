import { rest, type RestHandler } from 'msw';
import type { ProgramMembership } from '../types';

const path = '/api/loyalty/v1/programs/:programId/users/membership';

const fixtures = {
  success: (response: ProgramMembership): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
