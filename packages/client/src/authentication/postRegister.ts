import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for registering a user.
 *
 * @function postRegister
 * @memberof module:authentication/client
 * @param {object} data - Request data.
 * @param {string} data.countryCode - ISO 3166-1 alpha-2 code of the country.
 * Example: PT for Portugal.
 * @param {string} data.email - User's email.
 * @param {string} data.password - User's password.
 * @param {string} data.username - User's email.
 * @param {string} data.name - User's full name.
 * @param {string} [data.phoneNumber] - User's phone number.
 * @param {string} [data.titleId] - User title identifier.
 * @param {string} [data.firstName] - User's first name.
 * @param {string} [data.lastName] - User's last name.
 * @param {boolean} [data.receiveNewsletters] - If should receive newsletter.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (
  data: {
    countryCode: string;
    email: string;
    password: string;
    username: string;
    name: string;
    phoneNumber?: string;
    titleId?: string;
    firstName?: string;
    lastName?: string;
    receiveNewsletters?: boolean;
  },
  config?: { [k: string]: any },
): Promise<any> =>
  client
    .post('/account/v1/users', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
