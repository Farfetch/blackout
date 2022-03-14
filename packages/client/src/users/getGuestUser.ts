import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';

/**
 * Gets the guest user details with the specified id.
 *
 * @function getGuestUser
 * @memberof module:users/client
 *
 * @param {string} id - Universal identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getGuestUser = (id: string, config?: Config) =>
  client
    .get(join('/account/v1/guestUsers', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getGuestUser;
