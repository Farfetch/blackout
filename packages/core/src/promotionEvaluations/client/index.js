/**
 * PromotionEvaluations clients.
 *
 * @module promotionEvaluations/client
 * @category PromotionEvaluations
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/promotionEvaluations/client',
  '@farfetch/blackout-core/promotionEvaluations',
);

export { default as getPromotionEvaluationItems } from './getPromotionEvaluationItems';
