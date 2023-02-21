import { rest, type RestHandler } from 'msw';
import type { UserPersonalIdImage } from '../types';

const path = '/api/account/v1/users/:userId/personalIds/images';

const fixtures = {
  success: (response: UserPersonalIdImage): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
