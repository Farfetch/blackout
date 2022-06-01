import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';
import type { QuerySEO, SEOMetadata } from './types';

/**
 * Method responsible for searching the seo metadata for a specific page type.
 *
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getSEO = (query: QuerySEO, config?: Config): Promise<SEOMetadata> =>
  client
    .get(join('/seo/metadata', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSEO;
