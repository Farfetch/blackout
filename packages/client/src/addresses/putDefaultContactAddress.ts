import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutDefaultContactAddress } from './types';

/**
 * Sets the address specified with 'id', as the default contact address.
 *
 * @param userId    - Identifier of the user.
 * @param addressId - Identifier of the address.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putDefaultContactAddress: PutDefaultContactAddress = (
  userId,
  addressId,
  config,
) =>
  client
    .put(
      join('/account/v1/users', userId, 'addresses/preferred', addressId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putDefaultContactAddress;
