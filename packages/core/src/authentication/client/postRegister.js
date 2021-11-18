import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} LoyaltyData
 *
 * @alias LoyaltyData
 * @memberof module:authentication/client
 *
 * @property {boolean} join - If should join rewards program.
 * @property {string} [externalId]  - Id of the rewards program the user wants
 * to associate with.
 *
 */

/**
 * @typedef {object} PostRegisterData
 *
 * @alias PostRegisterData
 * @memberof module:authentication/client
 *
 * @property {string} email - User's email.
 * @property {string} password - User's password.
 * @property {string} username - User's email.
 * @property {string} name - User's full name.
 * @property {string} [titleId] - User title identifier.
 * @property {string} [firstName] - User's first name.
 * @property {string} [lastName] - User's last name.
 * @property {boolean} [receiveNewsletters] - If should receive newsletter.
 * @property {LoyaltyData} [loyalty] - Loyalty program details.
 *
 */

/**
 * Method responsible for registering a user.
 *
 * @function postRegister
 * @memberof module:authentication/client
 *
 * @param {PostRegisterData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) => {
  const hasCountryCode = data?.countryCode;
  const args = hasCountryCode
    ? ['/account/v1/users', data, config]
    : ['/legacy/v1/account/register', data, config];

  console.warn(
    `${PCKG_NAME}@${PCKG_VERSION}: The prop data from postRegister will require
      countryCode to be included that will also require changes regarding the
      register flow to fetch the authenticated token so the user can use the
      rest of the properties.`,
  );

  return client
    .post(...args)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
