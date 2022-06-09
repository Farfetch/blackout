import { rest, RestHandler } from 'msw';

const path = '/api/payment/v1/payments/:id';

export default {
  success: (response: Record<string, unknown>): RestHandler =>
    rest.patch(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.patch(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
