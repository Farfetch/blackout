import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutUserDefaultBillingAddress } from './types/index.js';

/**
 * Sets the address specified with 'id', as the default billing address.
 *
 * @param userId    - Identifier of the user.
 * @param addressId - Identifier of the address.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putUserDefaultBillingAddress: PutUserDefaultBillingAddress = (
  userId,
  addressId,
  config,
) =>
  client
    .put(
      join('/account/v1/users', userId, 'addresses/billing', addressId),
      undefined,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putUserDefaultBillingAddress;
