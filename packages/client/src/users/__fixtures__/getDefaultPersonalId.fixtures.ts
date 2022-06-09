import { rest, RestHandler } from 'msw';
import type { DefaultPersonalIdResponse } from '../types';

const path = '/api/account/v1/users/:userId/personalids/default';

export default {
  success: (response: DefaultPersonalIdResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
