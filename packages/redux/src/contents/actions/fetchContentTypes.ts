import { fetchContentTypesFactory } from './factories';
import { getContentTypes } from '@farfetch/blackout-client/contents';

/**
 * @callback FetchContentTypesThunkFactory
 * @param {string} spaceCode - The space where the content belongs to (website|mobileapp|emailTool...).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch content types.
 *
 * @function fetchContentTypes
 * @memberof module:contents/actions
 *
 * @param {Function} getContentTypes - Fetch content types client.
 *
 * @returns {FetchContentTypesThunkFactory} Thunk factory.
 */
export default fetchContentTypesFactory(getContentTypes);
