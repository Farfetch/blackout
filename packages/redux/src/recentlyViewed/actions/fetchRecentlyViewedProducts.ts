import { fetchRecentlyViewedProductsFactory } from './factories';
import { getRecentlyViewedProducts } from '@farfetch/blackout-client/recentlyViewed';

/**
 *  Method responsible for retrieving a list of recently viewed product IDs.
 *
 *  @memberof module:recentlyViewed/actions
 *  @name fetchRecentlyViewedProducts
 *  @type {FetchRecentlyViewedProductsThunkFactory}
 */
export default fetchRecentlyViewedProductsFactory(getRecentlyViewedProducts);
