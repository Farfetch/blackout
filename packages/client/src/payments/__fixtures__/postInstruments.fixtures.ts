import { rest, RestHandler } from 'msw';
import type { PostInstrumentsResponse } from '../types';

const path = '/api/payment/v1/intents/:id/instruments';

const fixtures = {
  success: (response: PostInstrumentsResponse): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(
        ctx.status(201),
        ctx.json(response.data),
        ctx.set({ location: 'https://somelocation.com' }),
      ),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
