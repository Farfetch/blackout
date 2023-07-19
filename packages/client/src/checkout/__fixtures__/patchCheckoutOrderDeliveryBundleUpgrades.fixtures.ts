import { rest, type RestHandler } from 'msw';
import type { Controls } from '../../index.js';

const path =
  '/api/checkout/v1/orders/:id/deliveryBundles/:deliveryBundleId/upgrades';

const fixtures = {
  success: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.status(204))),
  successWithData: (response: Controls): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.json(response))),
  failure: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
