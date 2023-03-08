import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PutUserAddress } from './types/index.js';

/**
 * Responsible for updating the address information with the specified 'id'.
 *
 * @param props  - Put address query.
 * @param data   - Object containing the address information.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putUserAddress: PutUserAddress = ({ userId, id }, data, config) =>
  client
    .put(`/account/v1/users/${userId}/addresses/${id}`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putUserAddress;
