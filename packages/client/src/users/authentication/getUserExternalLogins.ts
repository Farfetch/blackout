import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserExternalLogins } from './types/getUserExternalLogins.types.js';

/**
 * Method responsible for fetching the external logins of a user.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserExternalLogins: GetUserExternalLogins = (userId, config) =>
  client
    .get(join('/account/v1/users', userId, '/externalLogins/'), config)
    .then(response => response.data)
    .catch(error => {
      // console.log(error);
      throw adaptError(error);
    });

export default getUserExternalLogins;
