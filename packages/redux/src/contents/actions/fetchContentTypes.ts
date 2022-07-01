import { fetchContentTypesFactory } from './factories';
import { getContentTypes } from '@farfetch/blackout-client';

/**
 * @param spaceCode - The space where the content belongs to (website|mobileapp|emailTool...).
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch content types.
 *
 * @param getContentTypes - Fetch content types client.
 *
 * @returns Thunk factory.
 */
export default fetchContentTypesFactory(getContentTypes);
