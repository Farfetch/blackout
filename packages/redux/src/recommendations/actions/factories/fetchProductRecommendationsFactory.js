import * as actionTypes from '../../actionTypes';
import { adaptProductRecommendations } from '@farfetch/blackout-client/helpers/adapters';

/**
 * @callback FetchProductRecommendationsThunkFactory
 *
 * @alias FetchProductRecommendationsThunkFactory
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
 * @function fetchProductRecommendationsFactory
 * @memberof module:recommendations/actions/factories
 *
 * @param {Function} getProductRecommendations - Get product recommendations client.
 *
 * @returns {FetchProductRecommendationsThunkFactory} Thunk factory.
 */
export default getProductRecommendations =>
  (productId, strategyName, config) =>
  async dispatch => {
    dispatch({
      type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST,
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
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS,
        payload: {
          id: recommendations.id,
          values: recommendations.values,
        },
        meta: {
          strategyName,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE,
        payload: { error },
        meta: { strategyName },
      });

      throw error;
    }
  };
