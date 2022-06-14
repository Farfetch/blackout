import client, { adaptError } from '../../helpers/client';
import type { DeleteUserAddress } from './types';

/**
 * Responsible for removing the address with the specified 'id'.
 *
 * @param props  - Delete address properties.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const deleteUserAddress: DeleteUserAddress = ({ id, userId }, config) =>
  client
    .delete(`/account/v1/users/${userId}/addresses/${id}`, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });