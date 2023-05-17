import { rest, type RestHandler } from 'msw';
import type { ReturnPickupCapability } from '../types/returnPickupCapability.types.js';

const path = '/api/account/v1/returns/:id/pickupcapabilities/:pickupDay';

const fixtures = {
  success: (response: ReturnPickupCapability): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
