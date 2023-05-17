import { rest, type RestHandler } from 'msw';

const path = '/api/commerce/v1/wishlists/:wishlistId/sets/:wishlistSetId';

const fixtures = {
  success: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
