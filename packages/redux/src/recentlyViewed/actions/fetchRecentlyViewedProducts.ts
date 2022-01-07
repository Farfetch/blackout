import { fetchRecentlyViewedProductsFactory } from './factories';
import { getRecentlyViewedProducts } from '@farfetch/blackout-client/recentlyViewed';

/**
 * @typedef {object} FetchRecentlyViewedProductsQuery
 *
 * @alias FetchRecentlyViewedProductsQuery
 * @memberof module:recentlyViewed/actions
 *
 * @property {number} [page] - Page to be retrieved with the recently viewed products.
 * @property {number} [pageSize] - Quantity of items to be retrieved within each page.
 */

/**
 * @callback FetchRecentlyViewedProductsThunkFactory
 *
 * @alias FetchRecentlyViewedProductsThunkFactory
 *
 * @memberof module:recentlyViewed/actions
 *
 * @param {FetchRecentlyViewedProductsQuery} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client.
 *
 * @returns {Function} - Thunk to be dispatched to the redux store.
 */

/**
 *  Method responsible for retrieving a list of recently viewed product IDs.
 *
 *  @memberof module:recentlyViewed/actions
 *  @name fetchRecentlyViewedProducts
 *  @type {FetchRecentlyViewedProductsThunkFactory}
 */
export default fetchRecentlyViewedProductsFactory(getRecentlyViewedProducts);
