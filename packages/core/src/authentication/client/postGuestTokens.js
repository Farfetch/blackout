import client, {
  adaptError,
  configApiBlackAndWhite,
} from '../../helpers/client';

/**
 * @typedef {object} PostGuestTokensData
 *
 * @alias PostGuestTokensData
 * @memberof module:authentication/client
 *
 * @property {string} guestUserId - Guest user id.
 * @property {string} [guestUserEmail] - Guest user email.
 * @property {string} [guestUserSecret] - Guest user secret (orderId).
 *
 */

/**
 * Method responsible for managing authentications.
 *
 * @function postGuestTokens
 * @memberof module:authentication/client
 *
 * @param {PostGuestTokensData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config = configApiBlackAndWhite) =>
  client
    .post('/authentication/v1/guestTokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
