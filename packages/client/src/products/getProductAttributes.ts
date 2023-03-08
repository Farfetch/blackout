import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetProductAttributes } from './types/index.js';

/**
 * Method responsible for loading the product attributes for a specific product id.
 *
 * @param id     - Product identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductAttributes: GetProductAttributes = (id, config) =>
  client
    .get(join('/commerce/v1/products', id, '/attributes'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductAttributes;
