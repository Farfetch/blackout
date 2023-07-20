import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteUserExternalLogin } from './types/deleteUserExternalLogin.types.js';

/**
 * Method responsible for deleting an external login from a user.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteUserExternalLogin: DeleteUserExternalLogin = (
  userId,
  externalLoginId,
  config,
) =>
  client
    .delete(
      join('/account/v1/users', userId, '/externalLogins', externalLoginId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteUserExternalLogin;
