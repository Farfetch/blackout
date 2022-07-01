import { fetchSEOFactory } from './factories';
import { getSEO } from '@farfetch/blackout-client';

/**
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch SEO metadata content with a specific query object.
 *
 * @param getSEO - Get SEO client.
 *
 * @returns Thunk factory.
 */
export default fetchSEOFactory(getSEO);
