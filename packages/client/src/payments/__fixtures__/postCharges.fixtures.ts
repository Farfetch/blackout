import { rest, RestHandler } from 'msw';
import type { PostChargesResponse } from '../types';

const path = '/api/payment/v1/intents/:id/charges';

export default {
  success: (response: PostChargesResponse): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json(response.data),
        ctx.set({ location: 'https://somelocation.com' }),
      ),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
