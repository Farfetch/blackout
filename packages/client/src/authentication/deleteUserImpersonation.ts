import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Deletes an user impersonation.
 *
 * @function deleteUserImpersonation
 * @memberof module:authentication/client
 *
 * @param {string} id - The impersonated access token.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id: number, config?: { [k: string]: any }): Promise<any> =>
  client
    .delete(join('/authentication/v1/userImpersonations', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
