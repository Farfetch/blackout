import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for fetching the logged user data.
 *
 * @function getUser
 * @memberof module:users/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default config =>
  client
    .get('/account/v1/users/me', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
