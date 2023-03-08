import type { Config } from '../../index.js';
import type {
  PromotionEvaluationId,
  PromotionEvaluationItem,
} from './promotionEvaluationItems.types.js';

export type GetPromotionEvaluationItems = (
  promotionEvaluationId: PromotionEvaluationId,
  config?: Config,
) => Promise<Array<PromotionEvaluationItem>>;
