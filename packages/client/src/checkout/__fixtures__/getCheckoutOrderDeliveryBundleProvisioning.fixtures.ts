import { rest, RestHandler } from 'msw';
import type { ItemDeliveryProvisioning } from '../types';

const path =
  '/api/checkout/v1/orders/:id/deliveryBundles/:deliveryBundleId/itemDeliveryProvisioning';

const fixtures = {
  success: (response: ItemDeliveryProvisioning[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;