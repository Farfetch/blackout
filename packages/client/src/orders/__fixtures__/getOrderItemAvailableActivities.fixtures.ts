import { rest, RestHandler } from 'msw';
import type { OrderItemActivities } from '../types';

const path = '/api/account/v1/orders/:id/items/:itemId/availableActivities';

const fixtures = {
  success: (response: OrderItemActivities[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
