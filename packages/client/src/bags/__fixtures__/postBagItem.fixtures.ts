import { rest, RestHandler } from 'msw';
import join from 'proper-url-join';
import type { Bag } from '../types';

const path = '/api/commerce/v1/bags';

export default {
  success: (params: { bagId: Bag['id']; response: Bag }): RestHandler =>
    rest.post(join(path, params.bagId, 'items'), async (req, res, ctx) =>
      res(ctx.status(200), ctx.json(params.response)),
    ),
  failure: (params: { bagId: Bag['id'] }): RestHandler =>
    rest.post(join(path, params.bagId, 'items'), async (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
