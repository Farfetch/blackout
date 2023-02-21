import { rest, type RestHandler } from 'msw';
import type { Country } from '../types';
import type { PagedResponse } from '../../types/common/pagedResponse.types';

const path = '/api/settings/v1/countries';

const fixtures = {
  get: {
    success: (response: PagedResponse<Country>): RestHandler =>
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
