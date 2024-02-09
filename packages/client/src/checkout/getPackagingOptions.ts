import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetPackagingOptions } from './types/index.js';

/**
 * Method responsible for loading the packaging options.
 *
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPackagingOptions: GetPackagingOptions = (query, config) =>
  client
    .get(join('/checkout/v1/packagingOptions', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPackagingOptions;
