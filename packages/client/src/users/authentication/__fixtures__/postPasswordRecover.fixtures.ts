import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';

const path = `${defaultBaseURL}/legacy/v1/account/password/retrieve`;

const fixtures = {
  success: (): RestHandler =>
    rest.post(path, (_req, res, ctx) => res(ctx.status(200))),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
