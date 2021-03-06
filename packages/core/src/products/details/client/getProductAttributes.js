import client, { adaptError } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading the product attributes for a specific product id.
 *
 * @function getProductAttributes
 * @memberof module:products/client
 *
 * @param {number} id - Product identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, config) =>
  client
    .get(join('/commerce/v1/products', id, '/attributes'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
