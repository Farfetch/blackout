import client, { adaptError } from '../helpers/client';
import type { DeleteAddress } from './types';

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
const deleteAddress: DeleteAddress = ({ id, userId }, config) =>
  client
    .delete(`/account/v1/users/${userId}/addresses/${id}`, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteAddress;
