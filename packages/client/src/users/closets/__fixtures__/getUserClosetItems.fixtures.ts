import { rest, type RestHandler } from 'msw';
import type { ClosetItems } from '../index.js';

const path = '/api/account/v1/users/:userId/closets/:closetId/items';

const fixtures = {
  success: (response: ClosetItems): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
