import { rest, type RestHandler } from 'msw';
import type { PostPaymentIntentInstrumentResponse } from '../types/postPaymentIntentInstrument.types.js';

const path = '/api/payment/v1/intents/:id/instruments';

const fixtures = {
  success: (response: PostPaymentIntentInstrumentResponse): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(
        ctx.status(201),
        ctx.json(response),
        ctx.set({ location: 'https://somelocation.com' }),
      ),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
