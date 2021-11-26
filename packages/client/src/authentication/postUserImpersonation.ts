import client, { adaptError } from '../helpers/client';

/**
 * Creates user impersonation.
 *
 * @function postUserImpersonation
 * @memberof module:authentication/client
 * @param {object} data - The impersonate data.
 * @param {string} data.impersonatorPassword - The impersonator user name.
 * @param {string} data.impersonateeUserName - The impersonator password.
 * @param {string} data.impersonatorUserName - The user name to impersonate.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    impersonatorUserName: string;
    impersonatorPassword: string;
    impersonateeUserName: string;
  },
  config?: { [k: string]: any },
): Promise<any> =>
  client
    .post('/authentication/v1/userImpersonations', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
