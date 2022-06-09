import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/users/phoneNumberValidations';

export default {
  success: (response: Record<string, unknown>): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
