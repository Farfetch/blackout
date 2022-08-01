import { fetchSEOFactory } from './factories';
import { getSEO } from '@farfetch/blackout-client';

/**
 * Fetch SEO metadata content with a specific query object.
 *
 * @param getSEO - Get SEO client.
 *
 * @returns Thunk factory.
 */
export default fetchSEOFactory(getSEO);
