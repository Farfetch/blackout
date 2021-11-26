import { fetchListingFactory } from './factories';
import { getListing } from '@farfetch/blackout-client/products';

/**
 * Fetch product listing for a given slug with specific query parameters.
 *
 * @memberof module:products/actions
 *
 * @name fetchListing
 *
 * @type {FetchListingThunkFactory}
 */
export default fetchListingFactory(getListing);
