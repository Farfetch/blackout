import client, { adaptError } from '../helpers/client';
import type { PostAddress } from './types';

/**
 * Responsible for creating an address for the current user.
 *
 * @function postAddress
 * @memberof module:addresses/client
 *
 * @param {Object} props
 * @param {number} props.userId - Identifier of the user.
 * @param {object} data - Object containing the address information.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<string|object>} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postAddress: PostAddress = ({ userId }, data, config) => {
  return client
    .post(`/account/v1/users/${userId}/addresses`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default postAddress;
