import { fetchCommercePagesFactory } from './factories';
import { getCommercePages } from '@farfetch/blackout-client';

/**
 * Load commerce pages for a specific query object received.
 *
 * @param getCommercePages - Get commerce pages client.
 *
 * @returns Thunk factory.
 */
export default fetchCommercePagesFactory(getCommercePages);
