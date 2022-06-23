import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductFittings } from './types';

/**
 * Method responsible for getting a product fittings information.
 *
 * @param id     - Product ID we want to know the fittings information.
 * @param id     -
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductFittings: GetProductFittings = (id, config) =>
  client
    .get(join('/commerce/v1/products', id, 'fittings'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductFittings;
