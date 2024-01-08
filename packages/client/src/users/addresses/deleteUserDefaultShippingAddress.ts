import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteUserDefaultShippingAddress } from './types/index.js';

/**
 * Responsible for unsetting the users default shipping address.
 *
 * @param userId - Identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteUserDefaultShippingAddress: DeleteUserDefaultShippingAddress = (
  userId,
  config,
) =>
  client
    .delete(
      join('/account/v1/users', userId, 'addresses/shipping/current'),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteUserDefaultShippingAddress;
