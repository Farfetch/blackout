import client, { adaptError } from '../../helpers/client';

/**
 * Method responsible for validates a phone number without an account.
 *
 * @function postPhoneTokenValidations
 * @memberof module:profile/client
 *
 * @param {object} data - Object containing the phone number and token.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */

export default (data, config) =>
  client
    .post('/account/v1/users/phoneTokenValidations', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
