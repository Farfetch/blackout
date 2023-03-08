import { rest, type RestHandler } from 'msw';
import type { PaymentTokens } from '../types/index.js';

const path = '/api/payment/v1/tokens';

const fixtures = {
  success: (response: PaymentTokens): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
