import { rest, type RestHandler } from 'msw';
import type { Return } from '../types/index.js';

const path = '/api/account/v1/returns';

const fixtures = {
  success: (response: Return): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
