import { rest, RestHandler } from 'msw';
import type { Address } from '../types';

const path = '/api/account/v1/users/:userId/addresses';

export default {
  success: (response: Address[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
