import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for getting personal ids.
 *
 * @function getPersonalIds
 * @memberof module:profile/client
 *
 * @param {number} userId - Universal identifier of the user.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, config) =>
  client
    .get(join('/account/v1/users/', userId, '/personalIds'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
