import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetPromotionEvaluationItems,
  type PromotionEvaluationId,
  type PromotionEvaluationItem,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPromotionEvaluationItemsAction } from '../../types';

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
  (promotionEvaluationId: PromotionEvaluationId, config?: Config) =>
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { promotionEvaluationId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPromotionEvaluationItemsFactory;
