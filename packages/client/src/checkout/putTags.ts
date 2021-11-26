import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutTags } from './types';

/**
 * Method responsible for adding tags information.
 *
 * @function putTags
 * @memberof module:checkout/client
 *
 * @param {string} id - Universal identifier of the Checkout.
 * @param {Array} data - Array of strings representing the tags you want to add.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const putTags: PutTags = (id, data, config) =>
  client
    .put(join('/checkout/v1/orders/', id, 'tags'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putTags;
