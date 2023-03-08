import { rest, type RestHandler } from 'msw';
import type { GuestUser } from '../types/index.js';

const path = '/api/account/v1/guestUsers';

const fixtures = {
  success: (response: GuestUser): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
