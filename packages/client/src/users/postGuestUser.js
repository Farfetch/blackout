import client, { adaptError } from '../helpers/client';

/**
 * @typedef {object} PostGuestUserData
 *
 * @alias PostGuestUserData
 * @memberof module:users/client
 *
 * @property {string} countryCode - ISO 3166-1 alpha-2 code of the country.
 *  For example, PT for Portugal.
 * @property {string} ip - IP address of the guest user.
 */

/**
 * Registers a new guest user.
 *
 * @function postGuestUser
 * @memberof module:users/client
 *
 * @param {PostGuestUserData} data - User to be registered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post('/account/v1/guestUsers', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
