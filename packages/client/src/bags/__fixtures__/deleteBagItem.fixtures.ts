import { rest, RestHandler } from 'msw';
import join from 'proper-url-join';
import type { Bag, BagItem } from '../types';

const path = '/api/commerce/v1/bags';

export default {
  success: (params: {
    bagId: Bag['id'];
    bagItemId: BagItem['id'];
    response: Bag;
  }): RestHandler =>
    rest.delete(
      join(path, params.bagId, 'items', params.bagItemId),
      async (req, res, ctx) => res(ctx.status(200), ctx.json(params.response)),
    ),
  failure: (params: {
    bagId: Bag['id'];
    bagItemId: BagItem['id'];
  }): RestHandler =>
    rest.delete(
      join(path, params.bagId, 'items', params.bagItemId),
      async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
