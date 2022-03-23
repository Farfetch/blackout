import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for creating a new personal id.
 *
 * @function postPersonalIds
 * @memberof module:profile/client
 *
 * @param {number} userId - User's id to get the personal ids from.
 * @param {object} data - Object containing personal id data.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, data, config) =>
  client
    .post(join('/account/v1/users', userId, 'personalids'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
