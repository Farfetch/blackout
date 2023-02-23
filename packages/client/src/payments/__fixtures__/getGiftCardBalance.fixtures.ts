import { rest, type RestHandler } from 'msw';
import type { Balance } from '../types';

const path = '/api/payment/v1/checkGiftCardBalance';

const fixtures = {
  success: (response: Balance): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
