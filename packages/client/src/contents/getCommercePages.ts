import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { CommercePages, QueryCommercePages } from './types/index.js';
import type { Config } from '../types/index.js';

/**
 * Method to receive all the commerce pages corresponding to the query object
 * received.
 *
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCommercePages = (
  query: QueryCommercePages,
  config?: Config,
): Promise<CommercePages> =>
  client
    .get(join('content/v2/commercepages', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCommercePages;
