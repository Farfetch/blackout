import { fetchListingFactory } from './factories';
import { getListing } from '@farfetch/blackout-client/products';

/**
 * Fetch product listing for a given slug with specific query parameters.
 */
export default fetchListingFactory(getListing);
