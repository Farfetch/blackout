import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for update user preferences.
 *
 * @function updatePreferences
 * @memberof module:users/client
 *
 * @param {object} userId - User's id to be filtered for.
 * @param {object} data - User preferences data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, data, config) =>
  client
    .put(join('/account/v1/users/', userId, '/preferences'), data, config)
    .catch(error => {
      throw adaptError(error);
    });
