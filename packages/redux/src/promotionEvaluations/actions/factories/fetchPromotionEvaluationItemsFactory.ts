import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type { FetchPromotionEvaluationItemsAction } from '../../types';
import type {
  GetPromotionEvaluationItems,
  PromotionEvaluationId,
  PromotionEvaluationItem,
} from '@farfetch/blackout-client/promotionEvaluations/types';

/**
 * @param promotionEvaluationId - Promotion evaluation identifier.
 * @param config                - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch promotion
 * evaluation items for a given promotion evaluation id.
 *
 * @param getPromotionEvaluationItems - Get promotion evaluation items client.
 *
 * @returns Thunk factory.
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
    try {
      dispatch({
        meta: { promotionEvaluationId },
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
      });

      const result = await getPromotionEvaluationItems(
        promotionEvaluationId,
        config,
      );

      dispatch({
        meta: { promotionEvaluationId },
        payload: { result },
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { promotionEvaluationId },
        payload: { error: toError(error) },
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPromotionEvaluationItemsFactory;
