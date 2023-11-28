import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';

const path = `${defaultBaseURL}/account/v1/users/:userId/contacts/:contactId`;

const fixtures = {
  success: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.delete(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
