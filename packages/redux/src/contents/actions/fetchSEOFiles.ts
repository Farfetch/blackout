import { fetchSEOFilesFactory } from './factories/index.js';
import { getSEOFiles } from '@farfetch/blackout-client';

/**
 * Fetch SEO files with a specific query object.
 *
 * @param getSEOFiles - Get SEO files client.
 *
 * @returns Thunk factory.
 */
export default fetchSEOFilesFactory(getSEOFiles);
