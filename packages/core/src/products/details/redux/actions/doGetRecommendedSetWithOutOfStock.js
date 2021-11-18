import {
  FETCH_RECOMMENDED_SET_WITH_OOS_FAILURE,
  FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST,
  FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import recommendedSetWithOutOfStock from '../../../../entities/schemas/recommendedSetWithOutOfStock';

/**
 * @callback GetRecommendedSetWithOutOfStockThunkFactory
 * @param {number} recommendedSetId - Numeric identifier of the recommendSet.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product recommended sets for a given recommended set id.
 *
 * @function doGetRecommendedSetWithOutOfStock
 * @memberof module:products/details/actions
 *
 * @param {Function} getRecommendedSetWithOutOfStock - Get recommended set with
 * out of stock client.
 *
 * @returns {GetRecommendedSetWithOutOfStockThunkFactory} Thunk factory.
 */
export default getRecommendedSetWithOutOfStock =>
  (recommendedSetId, config) =>
  async dispatch => {
    dispatch({
      payload: { recommendedSetId },
      type: FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST,
    });

    try {
      const result = await getRecommendedSetWithOutOfStock(
        recommendedSetId,
        config,
      );

      return dispatch({
        payload: {
          ...normalize(result, recommendedSetWithOutOfStock),
          recommendedSetId,
        },
        type: FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: {
          error,
          recommendedSetId,
        },
        type: FETCH_RECOMMENDED_SET_WITH_OOS_FAILURE,
      });

      throw error;
    }
  };
