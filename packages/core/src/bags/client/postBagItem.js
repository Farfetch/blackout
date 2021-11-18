import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for adding a product to the bag.
 *
 * @function postBagItem
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {object} data - Details of the product to add to the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, data, config) =>
  client
    .post(join('/commerce/v1/bags', id, 'items'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
