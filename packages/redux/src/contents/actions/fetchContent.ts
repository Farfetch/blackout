import { fetchContentFactory } from './factories';
import { getSearchContents } from '@farfetch/blackout-client';

/**
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Load contents for a specific query object received.
 *
 * @param getSearchContents - Get content client.
 *
 * @returns Thunk factory.
 */
export default fetchContentFactory(getSearchContents);
