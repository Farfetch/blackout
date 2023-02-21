import { rest, type RestHandler } from 'msw';
import type { UserContact } from '../types';

const path = '/api/account/v1/users/:userId/contacts';

const fixtures = {
  success: (response: UserContact): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
