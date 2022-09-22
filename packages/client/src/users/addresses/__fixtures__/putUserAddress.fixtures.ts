import { rest, RestHandler } from 'msw';
import type { UserAddress } from '../../../types/common/address.types';

const path = '/api/account/v1/users/:userId/addresses/:id';

const fixtures = {
  success: (response: UserAddress): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.put(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;