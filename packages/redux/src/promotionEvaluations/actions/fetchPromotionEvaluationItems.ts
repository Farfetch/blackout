import { fetchPromotionEvaluationItemsFactory } from './factories';
import { getPromotionEvaluationItems } from '@farfetch/blackout-client';

/**
 * Fetches promotion evaluation items given a promotion evaluation id.
 */

export default fetchPromotionEvaluationItemsFactory(
  getPromotionEvaluationItems,
);
