import { rest, type RestHandler } from 'msw';
import type { Configurations } from '../types/index.js';

const path = '/api/settings/v1/configurations';

const fixtures = {
  success: (response: Configurations): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
