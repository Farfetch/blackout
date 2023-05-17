import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetBrands } from './types/index.js';

/**
 * Method responsible for fetching all the brands or a specific set of brands,
 * according to the provided filters.
 *
 * @param query  - Query with parameters to fetch brands.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getBrands: GetBrands = (query, config) =>
  client
    .get(
      join('/commerce/v1/brands', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBrands;
