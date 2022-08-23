import { rest, RestHandler } from 'msw';
import type { GetCountryStateCitiesResponse } from '../types';

const path = '/api/settings/v1/countries/:countryCode/states/:stateId/cities';

const fixtures = {
  get: {
    success: (response: GetCountryStateCitiesResponse): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, async (_req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};

export default fixtures;
