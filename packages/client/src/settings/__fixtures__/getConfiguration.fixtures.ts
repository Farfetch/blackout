import { rest, type RestHandler } from 'msw';
import type { Configuration } from '../types';

const path = '/api/settings/v1/configurations/:code';

const fixtures = {
  success: (response: Configuration): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
