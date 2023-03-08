import { fetchSEOMetadataFactory } from './factories/index.js';
import { getSEOMetadata } from '@farfetch/blackout-client';

/**
 * Fetch SEO metadata content with a specific query object.
 *
 * @param getSEOMetadata - Get SEO metadata client.
 *
 * @returns Thunk factory.
 */
export default fetchSEOMetadataFactory(getSEOMetadata);
