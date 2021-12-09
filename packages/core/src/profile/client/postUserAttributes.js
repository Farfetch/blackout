import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for creating new user attributes.
 *
 * @function postUserAttributes
 * @memberof module:profile/client
 *
 * @param {object} userId - User's id to set the attributes.
 * @param {object} [data] - Object containing the attributes.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, data, config) =>
  client
    .post(join('/account/v1/users', userId, 'attributes'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
