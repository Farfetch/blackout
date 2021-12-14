import { fetchPromotionEvaluationItemsFactory } from './factories';
import { getPromotionEvaluationItems } from '@farfetch/blackout-client/promotionEvaluations';

/**
 * Fetches promotion evaluation items given a promotion evaluation id.
 *
 * @memberof module:promotionEvaluations/actions
 *
 * @function fetchPromotionEvaluationItemsFactory
 *
 * @type {FetchPromotionEvaluationItemsThunkFactory}
 */

export default fetchPromotionEvaluationItemsFactory(
  getPromotionEvaluationItems,
);
