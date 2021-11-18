import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedMethod } from '../../helpers';
import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostRefreshTokenData
 *
 * @alias PostRefreshTokenData
 * @memberof module:authentication/client
 *
 * @property {string} username - User's email.
 */

/**
 * Refreshes the user's validation email token.
 * To be used when the user went past the email token's expiration date or
 * there was other kind of error validation the user's email.
 *
 * @function postRefreshToken
 * @memberof module:authentication/client
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the postRefreshEmailToken method from
 * "@bw/core/authentication/client".
 *
 * @param {PostRefreshTokenData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/authentication/client/postRefreshToken',
    '@farfetch/blackout-core/authentication/client/postRefreshEmailToken',
  );

  return client.post('/account/v1/emailtokens', data, config).catch(error => {
    throw adaptError(error);
  });
};
