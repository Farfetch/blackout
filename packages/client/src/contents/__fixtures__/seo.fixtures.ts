import { rest, type RestHandler } from 'msw';
import type { SEOMetadata } from '../types';

const path = '/api/content/v1/seometadata';

const fixtures = {
  get: {
    success: (response: SEOMetadata): RestHandler =>
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
