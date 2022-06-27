import { rest, RestHandler } from 'msw';
import type { PromotionEvaluationItem } from '../types';

const path =
  '/api/commerce/v1/promotionEvaluations/:promotionEvaluationId/promotionEvaluationItems';

const fixtures = {
  success: (response: PromotionEvaluationItem[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),

  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
