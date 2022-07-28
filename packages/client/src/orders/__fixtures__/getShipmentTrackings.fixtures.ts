import { rest, RestHandler } from 'msw';
import type { ShipmentTrackings } from '../types';

const path = '/api/account/v1/trackings';

const fixtures = {
  success: (response: ShipmentTrackings): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
