import client, { adaptError } from '../helpers/client';

/**
 * Responsible for getting all the addresses of the current user.
 *
 * @function getAddresses
 * @memberof module:addresses/client
 *
 * @param {Object} props
 * @param {number} props.userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<string|object>} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ userId }, config) =>
  client
    .get(`/account/v1/users/${userId}/addresses`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
