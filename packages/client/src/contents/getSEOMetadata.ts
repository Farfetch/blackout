import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import flattenObject from '../utils/flattenObject.js';
import join from 'proper-url-join';
import type { Config } from '../types/index.js';
import type { GetSEOMetadataQuery, SEOMetadata } from './types/index.js';

/**
 * Method responsible for searching the seo metadata for a specific page type.
 *
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getSEOMetadata = (
  query: GetSEOMetadataQuery,
  config?: Config,
): Promise<SEOMetadata> =>
  client
    .get(
      join('/content/v1/seometadata', { query: flattenObject(query) }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSEOMetadata;
