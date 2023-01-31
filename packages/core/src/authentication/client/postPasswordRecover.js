import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostPasswordRecoverData
 *
 * @alias PostPasswordRecoverData
 * @memberof module:authentication/client
 *
 * @property {string} username - User's email.
 * @property {string} uri - URI where the user will reset its password.
 */

/**
 * Method responsible for sending an email for the user to reset the password.
 *
 * @function postPasswordRecover
 * @memberof module:authentication/client
 *
 * @param {PostPasswordRecoverData} data - Request data.
 * @param {boolean} [newRecover] - Boolean to validate if it should use the new recover endpoint.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, newRecover = false, config) => {
  const hasURI = !!data?.uri;
  let args = hasURI
    ? ['/account/v1/users/passwordrecover', data, config]
    : ['/legacy/v1/account/password/recover', data, config];

  if (newRecover) {
    args = ['/legacy/v1/account/password/retrieve', data, config];
  }

  !hasURI &&
    console.warn(
      `${PCKG_NAME}@${PCKG_VERSION}: The prop data from postPasswordRecover will
      require uri in future versions`,
    );

  return client.post(...args).catch(error => {
    throw adaptError(error);
  });
};
