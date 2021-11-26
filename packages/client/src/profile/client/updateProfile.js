import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for update user profile.
 *
 * @function updateProfile
 * @memberof module:profile/client
 *
 * @param {number} id - User identifier.
 * @param {object} data - Profile data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .put(join('/account/v1/users', id), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
