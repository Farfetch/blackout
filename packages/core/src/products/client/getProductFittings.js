import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for getting a product fittings information.
 *
 * @function getProductFittings
 * @memberof module:products/client
 *
 * @param {number} productId - Product ID we want to know the fittings
 * information.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (productId, config) =>
  client
    .get(join('/commerce/v1/products', productId, 'fittings'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
