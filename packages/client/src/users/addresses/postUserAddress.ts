import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostUserAddress } from './types/index.js';

/**
 * Responsible for creating an address for the current user.
 *
 * @param props  - Post address query
 * @param data   - Object containing the address information.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postUserAddress: PostUserAddress = ({ userId }, data, config) => {
  return client
    .post(`/account/v1/users/${userId}/addresses`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default postUserAddress;
