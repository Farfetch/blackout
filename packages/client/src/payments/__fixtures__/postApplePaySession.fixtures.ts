import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { PostApplePaySessionResponse } from '../types/postApplePaySession.types.js';

const path = `${defaultBaseURL}/payment/v1/applePaySession`;

const fixtures = {
  success: (response: PostApplePaySessionResponse): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
