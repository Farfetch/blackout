import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutUserDefaultShippingAddress } from './types/index.js';

/**
 * Sets the address specified with 'id', as the default shipping address.
 *
 * @param userId    - Identifier of the user.
 * @param addressId - Identifier of the address.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putUserDefaultShippingAddress: PutUserDefaultShippingAddress = (
  userId,
  addressId,
  config,
) =>
  client
    .put(
      join('/account/v1/users', userId, 'addresses/shipping', addressId),
      undefined,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putUserDefaultShippingAddress;
