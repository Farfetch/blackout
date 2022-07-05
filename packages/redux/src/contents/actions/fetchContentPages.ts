import { fetchContentPagesFactory } from './factories';
import { getContentPages } from '@farfetch/blackout-client/contents';

/**
 * Load ranked content page for a specific slug and strategy object received.
 *
 * @function FetchContentPages
 * @memberof module:contents/actions
 *
 * @param {Function} getContentPages - Get content pages client.
 *
 * @returns {FetchContentPagesThunkFactory} Thunk factory.
 */
export default fetchContentPagesFactory(getContentPages);
