import { deleteRecentlyViewedProduct } from '@farfetch/blackout-client/recentlyViewed';
import { removeRecentlyViewedProductFactory } from './factories';

/**
 *  Method responsible for deleting the entry of a recently viewed product.
 *
 *  @memberof module:recentlyViewed/actions
 *  @name removeRecentlyViewedProduct
 *  @type {RemoveRecentlyViewedProductThunkFactory}
 */
export default removeRecentlyViewedProductFactory(deleteRecentlyViewedProduct);
