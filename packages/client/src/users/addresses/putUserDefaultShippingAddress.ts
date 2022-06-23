import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PutUserDefaultShippingAddress } from './types';

/**
 * Sets the address specified with 'id', as the default shipping address.
 *
 * @param props  - Put default shipping address.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const putUserDefaultShippingAddress: PutUserDefaultShippingAddress = (
  { id, userId },
  config,
) =>
  client
    .put(`/account/v1/users/${userId}/addresses/shipping/${id}`, {}, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
