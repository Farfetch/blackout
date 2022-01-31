import { rest, RestHandler } from 'msw';
import type { StaffMember } from '../types';

const path = '/api/account/v1/staffMembers/:id';

export default {
  success: (response: StaffMember): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
