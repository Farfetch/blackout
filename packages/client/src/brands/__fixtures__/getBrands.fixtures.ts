import { rest, RestHandler } from 'msw';
import type { Brands } from '../types';

const path = '/api/commerce/v1/brands';

export default {
  success: (response: Brands): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
