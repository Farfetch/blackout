import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductVariantsMeasurements } from './types';

/**
 * Method responsible for loading the measurements for a specific product.
 *
 * @function getProductVariantsMeasurements
 * @memberof module:products/client
 *
 * @param {number} id - Product identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getProductVariantsMeasurements: GetProductVariantsMeasurements = (
  id,
  config,
) =>
  client
    .get(join('/commerce/v1/products', id, '/variantsMeasurements'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductVariantsMeasurements;
