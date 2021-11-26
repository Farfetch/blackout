import client, { adaptError } from '../helpers/client';

/**
 * Responsible for removing the address with the specified 'id'.
 *
 * @function deleteAddress
 * @memberof module:addresses/client
 *
 * @param {Object} props
 * @param {string} props.id - Identifier of the address.
 * @param {number} props.userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<string|object>} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ id, userId }, config) =>
  client
    .delete(`/account/v1/users/${userId}/addresses/${id}`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
