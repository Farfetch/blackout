import client, { adaptError } from '../helpers/client';
import type { GetAddress } from './types';

/**
 * Responsible for getting the details of the address with the specified 'id'.
 *
 * @param props  - Get address properties.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getAddress: GetAddress = ({ id, userId }, config) =>
  client
    .get(`/account/v1/users/${userId}/addresses/${id}`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getAddress;
