import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductColorGrouping } from './types';

/**
 * Method responsible for loading the color grouping for a specific product.
 *
 * @param id     - Product identifier.
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductColorGrouping: GetProductColorGrouping = (id, query, config) =>
  client
    .get(join('/commerce/v1/products', id, '/colorgrouping', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductColorGrouping;
