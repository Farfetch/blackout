import { rest, type RestHandler } from 'msw';

const path = '/api/account/v1/orders/:orderId/shippingAddressChangeRequests';

const fixtures = {
  success: (response: number): RestHandler =>
    rest.post(
      path,
      async (_req, res, ctx) => await res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(
      path,
      async (_req, res, ctx) =>
        await res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
