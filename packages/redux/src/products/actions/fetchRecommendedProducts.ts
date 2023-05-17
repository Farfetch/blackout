import { fetchRecommendedProductsFactory } from './factories/index.js';
import { getRecommendedProducts } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving recommendations for a product based on a
 * strategy.
 */
export default fetchRecommendedProductsFactory(getRecommendedProducts);
