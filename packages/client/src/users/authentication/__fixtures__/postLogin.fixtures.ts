import { rest, type RestHandler } from 'msw';
import type { LoginResponse } from '../types/index.js';

const path = '/api/legacy/v1/account/login';

const fixtures = {
  success: (response: LoginResponse): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
