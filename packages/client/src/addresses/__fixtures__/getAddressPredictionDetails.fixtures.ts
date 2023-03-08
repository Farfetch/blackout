import { rest, type RestHandler } from 'msw';
import type { AddressPrediction } from '../types/index.js';

const path = '/api/account/v1/addressesprediction/:predictionId/address';

const fixtures = {
  success: (response: AddressPrediction): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
