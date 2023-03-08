import { rest, type RestHandler } from 'msw';
import type { GuestUser } from '../types/index.js';

const path = '/api/account/v1/guestUsers/:userId';

const fixtures = {
  success: (response: GuestUser): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
