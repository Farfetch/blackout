import { rest, RestHandler } from 'msw';
import type { Prediction } from '../types';

const path = '/api/account/v1/addressesprediction/:predictionId/address';

export default {
  success: (response: Prediction): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
