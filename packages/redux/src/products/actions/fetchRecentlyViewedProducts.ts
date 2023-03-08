import { fetchRecentlyViewedProductsFactory } from './factories/index.js';
import { getRecentlyViewedProducts } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving a list of recently viewed product IDs.
 */
export default fetchRecentlyViewedProductsFactory(getRecentlyViewedProducts);
