import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';
import type { OrderShippingAddressChangeRequests } from '../types/index.js';

const path = `${defaultBaseURL}/account/v1/orders/:orderId/shippingAddressChangeRequests`;

const fixtures = {
  success: (response: OrderShippingAddressChangeRequests): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
