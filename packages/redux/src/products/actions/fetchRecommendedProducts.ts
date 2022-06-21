import { fetchRecommendedProductsFactory } from './factories';
import { getRecommendedProducts } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving recommendations for a product based on a
 * strategy.
 */
export const fetchRecommendedProducts = fetchRecommendedProductsFactory(
  getRecommendedProducts,
);
