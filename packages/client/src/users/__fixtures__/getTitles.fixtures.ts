import { rest, RestHandler } from 'msw';
import type { GetTitlesResponse } from '../types';

const path = '/api/account/v1/titles';

export default {
  success: (response: GetTitlesResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
