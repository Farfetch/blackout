import { fetchProductRecommendationsFactory } from './factories';
import { getProductRecommendations } from '@farfetch/blackout-client/recommendations';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Method responsible for retrieving recommendations for a product based on a
 * strategy.
 *
 * @memberof module:recommendations/actions
 *
 * @name fetchProductRecommendations
 * @type {FetchProductRecommendationsThunkFactory}
 * @param {Function} getProductRecommendations - Get product recommendations client.
 */
export default fetchProductRecommendationsFactory(getProductRecommendations);
