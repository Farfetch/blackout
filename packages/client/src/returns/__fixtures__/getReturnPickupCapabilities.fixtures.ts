import { rest, RestHandler } from 'msw';
import type { PickupCapabilities } from '../types/pickupCapabilities.types';

const path = '/api/account/v1/returns/:id/pickupcapabilities/:pickupDay';

export default {
  success: (response: PickupCapabilities): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
