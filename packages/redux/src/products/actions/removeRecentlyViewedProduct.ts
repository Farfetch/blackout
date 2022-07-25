import { deleteRecentlyViewedProduct } from '@farfetch/blackout-client';
import { removeRecentlyViewedProductFactory } from './factories';

/**
 * Method responsible for deleting the entry of a recently viewed product.
 */
export default removeRecentlyViewedProductFactory(deleteRecentlyViewedProduct);
