import { rest, RestHandler } from 'msw';
import type { UserPersonalIdPartial } from '../types';

const path = '/api/account/v1/users/:userId/personalIds/:personalId';

const fixtures = {
  success: (response: UserPersonalIdPartial): RestHandler =>
    rest.patch(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.patch(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
