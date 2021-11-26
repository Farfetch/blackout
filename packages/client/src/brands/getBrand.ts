import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetBrand } from './types';

/**
 * Method responsible for get a specific brand.
 *
 * @memberof module:brands/client
 *
 * @param {number} id - Brand identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getBrand: GetBrand = (id, config) =>
  client
    .get(join('/commerce/v1/brands', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBrand;
