import { deleteRecentlyViewedProduct } from '@farfetch/blackout-client';
import { removeRecentlyViewedProductFactory } from './factories/index.js';

/**
 * Method responsible for deleting the entry of a recently viewed product.
 */
export default removeRecentlyViewedProductFactory(deleteRecentlyViewedProduct);
