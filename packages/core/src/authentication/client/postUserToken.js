import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedMethod } from '../../helpers';
import client, {
  adaptError,
  configApiBlackAndWhite,
} from '../../helpers/client';

/**
 * @typedef {object} PostUserTokenData
 *
 * @alias PostUserTokenData
 * @memberof module:authentication/client
 *
 * @property {string} username - User's email.
 * @property {string} password - User's password.
 * @property {string} guestUserId - Guest user id.
 * @property {string} grantType - Identity GrantType.
 * @property {string} refreshToken - Refresh Token.
 */

/**
 * Method responsible for managing authentications.
 *
 * @function postUserToken
 * @memberof module:authentication/client
 *
 * @param {PostUserTokenData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config = configApiBlackAndWhite) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/authentication/client/postUserToken',
    '@farfetch/blackout-core/authentication/client/postTokens for a authenticated user',
  );

  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/authentication/client/postUserToken',
    '@farfetch/blackout-core/authentication/client/postGuestTokens for a guest user',
  );

  return client
    .post('/authentication/v1/userTokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
