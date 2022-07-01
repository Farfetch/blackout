import { rest, RestHandler } from 'msw';
import type { PostTokenResponse } from '../types';

const path = 'https://api.blackandwhite-ff.com/authentication/v1/tokens';

const fixtures = {
  success: (response: PostTokenResponse): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
