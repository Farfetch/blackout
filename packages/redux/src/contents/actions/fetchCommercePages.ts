import { fetchCommercePagesFactory } from './factories';
import { getCommercePages } from '@farfetch/blackout-client/contents';

/**
 * Load commerce pages for a specific query object received.
 *
 * @function FetchCommercePages
 * @memberof module:contents/actions
 *
 * @param {Function} getCommercePages - Get commerce pages client.
 *
 * @returns {FetchCommercePagesThunkFactory} Thunk factory.
 */
export default fetchCommercePagesFactory(getCommercePages);
