import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteDefaultContactAddress } from './types';

/**
 * Responsible for unsetting the users default contact address.
 *
 * @param userId - Identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteDefaultContactAddress: DeleteDefaultContactAddress = (
  userId,
  config,
) =>
  client
    .delete(
      join('/account/v1/users', userId, 'addresses/preferred/current'),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteDefaultContactAddress;
