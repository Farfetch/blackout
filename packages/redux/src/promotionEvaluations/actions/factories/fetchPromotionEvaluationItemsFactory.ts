import {
  FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
  FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
  FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchPromotionEvaluationItemsAction } from '../../types';
import type {
  GetPromotionEvaluationItems,
  PromotionEvaluationId,
  PromotionEvaluationItem,
} from '@farfetch/blackout-client/promotionEvaluations/types';

/**
 * @callback FetchPromotionEvaluationItemsThunkFactory
 *
 * @param {string} promotionEvaluationId - Promotion evaluation identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch
 * promotion evaluation items for a given promotion evaluation id.
 *
 * @memberof module:promotionEvaluations/actions/factories
 *
 * @param {Function} getPromotionEvaluationItems - Get promotion evaluation items client.
 *
 * @returns {FetchPromotionEvaluationItemsThunkFactory} Thunk factory.
 */
const fetchPromotionEvaluationItemsFactory =
  (getPromotionEvaluationItems: GetPromotionEvaluationItems) =>
  (
    promotionEvaluationId: PromotionEvaluationId,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: Dispatch<FetchPromotionEvaluationItemsAction>,
  ): Promise<Array<PromotionEvaluationItem>> => {
    dispatch({
      meta: { promotionEvaluationId },
      type: FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
    });

    try {
      const result = await getPromotionEvaluationItems(
        promotionEvaluationId,
        config,
      );

      dispatch({
        meta: { promotionEvaluationId },
        payload: { result },
        type: FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { promotionEvaluationId },
        payload: { error },
        type: FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPromotionEvaluationItemsFactory;
