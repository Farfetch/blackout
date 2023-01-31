import {
  FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
  FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
  FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
} from '../actionTypes';

/**
 * @callback FetchPromotionEvaluationItemsThunkFactory
 *
 * @param {number} promotionEvaluationId - Numeric identifier of the promotion.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch promotion evaluation items for a given promotion evaluation id.
 *
 * @function fetchPromotionEvaluationItems
 * @memberof module:promotionEvaluation/actions
 *
 * @param {Function} getPromotionEvaluationItems - Get promotion evaluation items client.
 *
 * @returns {FetchPromotionEvaluationItemsThunkFactory} Thunk factory.
 */
export default getPromotionEvaluationItems =>
  (promotionEvaluationId, config) =>
  async dispatch => {
    dispatch({
      meta: { promotionEvaluationId },
      type: FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
    });

    try {
      const result = await getPromotionEvaluationItems(
        promotionEvaluationId,
        config,
      );

      return dispatch({
        meta: { promotionEvaluationId },
        payload: { result },
        type: FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { promotionEvaluationId },
        payload: { error },
        type: FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
      });

      throw error;
    }
  };
