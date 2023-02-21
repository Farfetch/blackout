import { rest, type RestHandler } from 'msw';
import type { ItemDeliveryProvisioning } from '../types';

const path =
  '/api/checkout/v1/orders/:id/deliveryBundles/:deliveryBundleId/upgrades/:upgradeId/itemDeliveryProvisioning';

const fixtures = {
  success: (response: ItemDeliveryProvisioning[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
