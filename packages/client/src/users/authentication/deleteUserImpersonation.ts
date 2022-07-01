import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { DeleteUserImpersonation } from './types';

/**
 * Deletes an user impersonation.
 *
 * @param id     - The impersonated access token.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteUserImpersonation: DeleteUserImpersonation = (id, config?) =>
  client
    .delete(join('/authentication/v1/userImpersonations', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteUserImpersonation;
