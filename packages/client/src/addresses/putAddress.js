import client, { adaptError } from '../helpers/client';

/**
 * Responsible for updating the address information with the specified 'id'.
 *
 * @function putAddress
 * @memberof module:addresses/client
 *
 * @param {Object} props
 * @param {string} props.id - Identifier of the address.
 * @param {number} props.userId - Identifier of the user.
 * @param {object} data - Object containing the address information.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<string|object>} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ userId, id }, data, config) =>
  client
    .put(`/account/v1/users/${userId}/addresses/${id}`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
