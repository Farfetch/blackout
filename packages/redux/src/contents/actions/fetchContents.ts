import { fetchContentsFactory } from './factories/index.js';
import { getSearchContents } from '@farfetch/blackout-client';

/**
 * Load contents for a specific query object received.
 *
 * @param getSearchContents - Get content client.
 *
 * @returns Thunk factory.
 */
export default fetchContentsFactory(getSearchContents);
