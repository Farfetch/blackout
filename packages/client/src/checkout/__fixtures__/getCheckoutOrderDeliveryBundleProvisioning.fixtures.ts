import { rest, type RestHandler } from 'msw';
import type { CheckoutOrderItemDeliveryProvisioning } from '../types/index.js';

const path =
  '/api/checkout/v1/orders/:id/deliveryBundles/:deliveryBundleId/itemDeliveryProvisioning';

const fixtures = {
  success: (response: CheckoutOrderItemDeliveryProvisioning[]): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
