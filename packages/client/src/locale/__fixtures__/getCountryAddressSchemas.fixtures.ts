import { rest, RestHandler } from 'msw';
import type { AddressSchema } from '../types';

const path = '/api/account/v1/countries/:isoCode/addressSchemas';

const fixtures = {
  success: (response: AddressSchema): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
