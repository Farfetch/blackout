import { rest, type RestHandler } from 'msw';
import type { City } from '../types/index.js';

const path = '/api/settings/v1/countries/:countryCode/states/:stateId/cities';

const fixtures = {
  get: {
    success: (response: City[]): RestHandler =>
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
