import { fetchCustomListingFactory } from './factories/index.js';
import { getProductListing } from '@farfetch/blackout-client';

/**
 * Fetch a specific custom listing by its id.
 */
export default fetchCustomListingFactory(getProductListing);
