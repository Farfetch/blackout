import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Sets the address specified with 'id', as the default contact address.
 *
 * @function putDefaultContactAddress
 * @memberof module:addresses/client
 *
 * @param {string} userId - Identifier of the user.
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, addressId, config) =>
  client
    .put(
      join('/account/v1/users', userId, 'addresses/preferred', addressId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
