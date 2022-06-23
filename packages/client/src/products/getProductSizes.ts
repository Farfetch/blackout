import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductSizes } from './types';

/**
 * Method responsible for loading the product sizes for a specific product id.
 *
 * @param id     - Product identifier.
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductSizes: GetProductSizes = (id, query, config) =>
  client
    .get(join('/commerce/v1/products', id, '/sizes', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductSizes;
