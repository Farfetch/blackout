import client, { adaptError, configApiBlackAndWhite } from '../helpers/client';

/**
 * @typedef {object} PostGuestTokensData
 *
 * @alias PostGuestTokensData
 * @memberof module:authentication/client
 *
 * @property {string} guestUserId - Guest user id.
 */

/**
 * Method responsible for managing authentications.
 *
 * @function postGuestTokens
 * @memberof module:authentication/client
 * @param {PostGuestTokensData} data - Request data.
 * @param {number} data.guestUserId - Guest user id.
 * @param {string} data.guestUserEmail - Guest user email.
 * @param {string} data.guestUserSecret - Guest user secret (orderid).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    guestUserId: number;
  },
  config: { [k: string]: any } = configApiBlackAndWhite,
): Promise<any> =>
  client
    .post('/authentication/v1/guestTokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
