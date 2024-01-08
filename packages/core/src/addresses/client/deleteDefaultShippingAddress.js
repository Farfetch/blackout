import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Responsible for unsetting the users default shipping address.
 *
 * @function deleteDefaultShippingAddress
 * @memberof module:addresses/client
 *
 * @param {string} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, config) =>
  client
    .delete(
      join('/account/v1/users', userId, 'addresses/shipping/current'),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
