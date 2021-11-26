import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for logging out a user.
 *
 * @function postLogout
 * @memberof module:authentication/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (config?: { [k: string]: any }): Promise<any> =>
  client.post('/legacy/v1/account/logout', {}, config).catch(error => {
    throw adaptError(error);
  });
