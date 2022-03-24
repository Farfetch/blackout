import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for creating a new personal id image.
 *
 * @function postPersonalIdImage
 * @memberof module:profile/client
 *
 * @param {number} userId - User's id to create personal id image.
 * @param {object} data - Object containing the image.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, data, config) =>
  client
    .post(join('/account/v1/users', userId, 'personalIds/images'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
