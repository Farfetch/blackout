import client, { adaptError } from '../../helpers/client';
import type { PutUserAddress } from './types';

/**
 * Responsible for updating the address information with the specified 'id'.
 *
 * @param props  - Put address query.
 * @param data   - Object containing the address information.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const putUserAddress: PutUserAddress = ({ userId, id }, data, config) =>
  client
    .put(`/account/v1/users/${userId}/addresses/${id}`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
