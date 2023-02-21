import { rest, type RestHandler } from 'msw';
import type { DeliveryBundleUpgrades } from '../types';

const path =
  '/api/checkout/v1/orders/:id/deliveryBundles/:deliveryBundleId/upgrades';

const fixtures = {
  success: (response: DeliveryBundleUpgrades): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
