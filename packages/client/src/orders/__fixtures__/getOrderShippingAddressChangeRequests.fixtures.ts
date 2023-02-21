import { rest, type RestHandler } from 'msw';
import type { OrderShippingAddressChangeRequests } from '../types/index.js';

const path = '/api/account/v1/orders/:orderId/shippingAddressChangeRequests';

const fixtures = {
  success: (response: OrderShippingAddressChangeRequests): RestHandler =>
    rest.get(
      path,
      async (_req, res, ctx) => await res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(
      path,
      async (_req, res, ctx) =>
        await res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
