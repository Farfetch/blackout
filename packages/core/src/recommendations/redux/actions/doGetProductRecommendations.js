import * as actionTypes from '../actionTypes';
import { adaptProductRecommendations } from '../../../helpers/adapters';

/**
 * @callback GetProductRecommendationsThunkFactory
 *
 * @alias GetProductRecommendationsThunkFactory
 * @memberof module:recommendations/actions
 *
 * @param {number} productId - Product identifier.
 * @param {string} strategyName - Recommendation algorithm to be used.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for retrieving recommendations for a product based on a
 * strategy.
 *
 * @function doGetProductRecommendations
 * @memberof module:recommendations/actions
 *
 * @param {Function} getProductRecommendations - Get product recommendations client.
 *
 * @returns {GetProductRecommendationsThunkFactory} Thunk factory.
 */
export default getProductRecommendations =>
  (productId, strategyName, config) =>
  async dispatch => {
    dispatch({
      type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_REQUEST,
      meta: { strategyName },
    });

    try {
      const result = await getProductRecommendations(
        productId,
        strategyName,
        config,
      );

      const recommendations = adaptProductRecommendations(result);

      dispatch({
        type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_SUCCESS,
        payload: {
          id: recommendations.id,
          values: recommendations.values,
        },
        meta: {
          strategyName,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_FAILURE,
        payload: { error },
        meta: { strategyName },
      });

      throw error;
    }
  };
