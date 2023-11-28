import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';

const path = `${defaultBaseURL}/account/v1/users/:userId/addresses/billing/:id`;

const fixtures = {
  success: (): RestHandler =>
    rest.put(path, (_req, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
