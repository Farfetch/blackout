import { rest, type RestHandler } from 'msw';
import type { PostDraftOrdersResponse } from '../types/index.js';

const path = '/checkout/v1/draftOrders';

const fixtures = {
  success: (response: PostDraftOrdersResponse): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(201), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(400), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
