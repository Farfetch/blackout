import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedMethod } from '../../helpers';
import client, {
  adaptError,
  configApiBlackAndWhite,
} from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Deletes an user token.
 *
 * @function deleteUserToken
 * @memberof module:authentication/client
 *
 * @param {string} id - The user token id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config = configApiBlackAndWhite) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/authentication/client/deleteUserToken',
    '@farfetch/blackout-core/authentication/client/deleteTokens for a authenticated user',
  );

  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/authentication/client/deleteUserToken',
    '@farfetch/blackout-core/authentication/client/deleteGuestTokens for a guest user',
  );

  return client
    .delete(join('/authentication/v1/userTokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
};
