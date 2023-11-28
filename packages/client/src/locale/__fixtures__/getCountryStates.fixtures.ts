import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { State } from '../types/index.js';

const path = `${defaultBaseURL}/settings/v1/countries/:countryCode/states`;

const fixtures = {
  get: {
    success: (response: State[]): RestHandler =>
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
