import client, { adaptError } from '../helpers/client';
import type { GetAddresses } from './types';

/**
 * Responsible for getting all the addresses of the current user.
 *
 * @param props  - Get addresses query.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getAddresses: GetAddresses = ({ userId }, config) =>
  client
    .get(`/account/v1/users/${userId}/addresses`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getAddresses;
