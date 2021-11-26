import { deleteRecentlyViewedProduct } from '@farfetch/blackout-client/recentlyViewed';
import { removeRecentlyViewedProductFactory } from './factories';

/**
 * @callback RemoveRecentlyViewedProductThunkFactory
 *
 * @alias RemoveRecentlyViewedProductThunkFactory
 *
 * @memberof module:recentlyViewed/actions
 *
 * @param {number} productId - Identification number of the recently viewed product to delete.
 * @param {object} [config] - Custom configurations to send to the client.
 *
 * @returns {RemoveRecentlyViewedProductThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 *  Method responsible for deleting the entry of a recently viewed product.
 *
 *  @memberof module:recentlyViewed/actions
 *  @name removeRecentlyViewedProduct
 *  @type {RemoveRecentlyViewedProductThunkFactory}
 */
export default removeRecentlyViewedProductFactory(deleteRecentlyViewedProduct);
