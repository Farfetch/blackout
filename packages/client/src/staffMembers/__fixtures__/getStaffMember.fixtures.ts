import { rest, RestHandler } from 'msw';
import type { StaffMember } from '../types';

const path = '/api/account/v1/staffMembers/:id';

const fixtures = {
  success: (response: StaffMember): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;