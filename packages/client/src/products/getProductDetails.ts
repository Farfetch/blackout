import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductDetails } from './types';

/**
 * Method responsible for loading the product.
 *
 * @param id     - Product identifier.
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductDetails: GetProductDetails = (id, query, config) =>
  client
    .get(join('/commerce/v1/products', id, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductDetails;
