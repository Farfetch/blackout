import { rest, type RestHandler } from 'msw';
import type { Currency } from '../types';

const path = '/api/settings/v1/countries/:countryCode/currencies';

const fixtures = {
  get: {
    success: (response: Currency[]): RestHandler =>
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
