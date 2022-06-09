import { rest, RestHandler } from 'msw';
import type { Configurations } from '../types';

const path = '/api/settings/v1/configurations';

export default {
  success: (response: Configurations): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
