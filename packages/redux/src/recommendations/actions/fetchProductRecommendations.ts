import { fetchProductRecommendationsFactory } from './factories';
import { getProductRecommendations } from '@farfetch/blackout-client/recommendations';

/**
 * Method responsible for retrieving recommendations for a product based on a
 * strategy.
 */
export default fetchProductRecommendationsFactory(getProductRecommendations);
