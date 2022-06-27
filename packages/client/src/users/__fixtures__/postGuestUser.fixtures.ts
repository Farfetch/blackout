import { rest, RestHandler } from 'msw';
import type { GuestUserResponse } from '../types';

const path = '/api/account/v1/guestUsers';

export default {
  success: (response: GuestUserResponse): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
