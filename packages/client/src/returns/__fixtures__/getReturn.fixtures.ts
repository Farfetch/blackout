import { rest, type RestHandler } from 'msw';
import type { Return } from '../types/return.types.js';

const path = '/api/account/v1/returns/:id';

const fixtures = {
  success: (response: Return): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
