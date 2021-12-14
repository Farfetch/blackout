import type {
  PromotionEvaluationId,
  PromotionEvaluationItem,
} from './promotionEvaluationItems.types';

export type GetPromotionEvaluationItems = (
  promotionEvaluationId: PromotionEvaluationId,
  config?: Record<string, unknown>,
) => Promise<Array<PromotionEvaluationItem>>;
