import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductAttributes } from './types';

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
