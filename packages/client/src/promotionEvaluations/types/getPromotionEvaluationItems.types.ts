import type { Config } from '../..';
import type {
  PromotionEvaluationId,
  PromotionEvaluationItem,
} from './promotionEvaluationItems.types';

export type GetPromotionEvaluationItems = (
  promotionEvaluationId: PromotionEvaluationId,
  config?: Config,
) => Promise<Array<PromotionEvaluationItem>>;
