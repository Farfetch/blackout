import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { Brands } from '../types/index.js';

const path = `${defaultBaseURL}/commerce/v1/brands`;

const fixtures = {
  success: (response: Brands): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
