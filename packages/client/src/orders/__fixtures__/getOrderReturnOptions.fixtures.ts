import { rest, RestHandler } from 'msw';

const path = '/api/legacy/v1/orders/:id/returnoptions';

export default {
  success: (response: any): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
