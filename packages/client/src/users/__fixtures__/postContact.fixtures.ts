import { rest, RestHandler } from 'msw';
import type { ContactResponse } from '../types';

const path = '/api/account/v1/users/:userId/contacts';

export default {
  success: (response: ContactResponse): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
