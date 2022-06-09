// @TODO: Remove this file in version 2.0.0.
import { rest } from 'msw';

const path = '/api/settings/v1/sitefeatures';

export default {
  success: response =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: () =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
