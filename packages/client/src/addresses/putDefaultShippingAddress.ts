import client, { adaptError } from '../helpers/client';
import type { PutDefaultShippingAddress } from './types';

/**
 * Sets the address specified with 'id', as the default shipping address.
 *
 * @param props  - Put default shipping address.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putDefaultShippingAddress: PutDefaultShippingAddress = (
  { id, userId },
  config,
) =>
  client
    .put(`/account/v1/users/${userId}/addresses/shipping/${id}`, {}, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putDefaultShippingAddress;
