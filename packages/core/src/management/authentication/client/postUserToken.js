import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';
import client, { adaptError, configManagement } from '../../../helpers/client';

/**
 * @typedef {object} PostUserTokenData
 *
 * @alias PostUserTokenData
 * @memberof module:managementAuthentication/client
 *
 * @property {string} username - User's emails.
 * @property {string} password - User's password.
 * @property {string} guestUserId - Guest user id.
 * @property {string} grantType - Identity GrantType.
 * @property {string} refreshToken - Refresh Token.
 */

/**
 * Method responsible for managing authentications.
 *
 * @function postUserToken
 * @memberof module:managementAuthentication/client
 *
 * @param {PostUserTokenData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config = configManagement) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'postUserToken',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .post('/authentication/v1/userTokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
