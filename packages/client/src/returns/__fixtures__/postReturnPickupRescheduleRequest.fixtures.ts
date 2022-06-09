import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/returns/:id/pickupRescheduleRequests';

export default {
  success: (response: number): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(202), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
