import { rest, type RestHandler } from 'msw';

const path = '/api/account/v1/returns/:id/pickupRescheduleRequests';

const fixtures = {
  success: (response: number): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(202), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
