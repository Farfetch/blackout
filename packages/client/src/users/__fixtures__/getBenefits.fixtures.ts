import { rest, RestHandler } from 'msw';
import type { GetBenefitsResponse } from '../types';

const path = '/api/legacy/v1/userbenefits';

export default {
  success: (response: GetBenefitsResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
