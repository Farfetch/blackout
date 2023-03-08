import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetBrand } from './types/index.js';

/**
 * Method responsible for get a specific brand.
 *
 * @param id     - Brand identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getBrand: GetBrand = (id, config) =>
  client
    .get(join('/commerce/v1/brands', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBrand;
