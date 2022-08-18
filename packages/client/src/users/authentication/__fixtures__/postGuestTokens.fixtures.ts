import { rest, RestHandler } from 'msw';
import type { GuestToken } from '../types';

const path = '/api/authentication/v1/guestTokens';

const fixtures = {
  success: (response: GuestToken): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
