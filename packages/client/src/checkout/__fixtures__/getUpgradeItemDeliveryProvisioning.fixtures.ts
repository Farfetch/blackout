import { rest, RestHandler } from 'msw';
import type { GetItemDeliveryProvisioningResponse } from '../types';

const path =
  '/api/checkout/v1/orders/:id/deliveryBundles/:deliveryBundleId/upgrades/:upgradeId/itemDeliveryProvisioning';

const fixtures = {
  success: (response: GetItemDeliveryProvisioningResponse): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
