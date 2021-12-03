import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for getting user preferences.
 *
 * @function getPreferences
 * @memberof module:users/client
 *
 * @param {string} userId - User's id to.
 * @param {string} code - Preference code to be filtered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, code, config) =>
  client
    .get(
      join('/account/v1/users/', userId, '/preferences', {
        query: {
          code,
        },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
