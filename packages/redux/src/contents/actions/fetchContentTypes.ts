import { fetchContentTypesFactory } from './factories/index.js';
import { getContentTypes } from '@farfetch/blackout-client';

/**
 * Fetch content types.
 *
 * @param getContentTypes - Fetch content types client.
 *
 * @returns Thunk factory.
 */
export default fetchContentTypesFactory(getContentTypes);
