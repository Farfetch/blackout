import { fetchProductListingFactory } from './factories/index.js';
import { getProductListing } from '@farfetch/blackout-client';

/**
 * Fetch product listing for a given slug with specific query parameters.
 */

export default fetchProductListingFactory(getProductListing);
