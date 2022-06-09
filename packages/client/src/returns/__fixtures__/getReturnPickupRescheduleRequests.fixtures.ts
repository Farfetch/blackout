import { rest, RestHandler } from 'msw';
import type { PickupRescheduleRequests } from '../types';

const path = '/api/account/v1/returns/:id/pickupRescheduleRequests';

export default {
  success: (response: PickupRescheduleRequests): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
