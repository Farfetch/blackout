import { rest, type RestHandler } from 'msw';
import type { Contents } from '../types';

const path = '/api/content/v1/search/contents';

const fixtures = {
  get: {
    success: (response: Contents): RestHandler =>
      rest.get(path, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, (_req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};

export default fixtures;
