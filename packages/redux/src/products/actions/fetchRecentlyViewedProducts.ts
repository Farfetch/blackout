import { fetchRecentlyViewedProductsFactory } from './factories';
import { getRecentlyViewedProducts } from '@farfetch/blackout-client/products';

/**
 * Method responsible for retrieving a list of recently viewed product IDs.
 */
export default fetchRecentlyViewedProductsFactory(getRecentlyViewedProducts);
