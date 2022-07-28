import { rest, RestHandler } from 'msw';
import type { UserBenefit } from '../types';

const path = '/api/legacy/v1/userbenefits';

const fixtures = {
  success: (response: UserBenefit): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
