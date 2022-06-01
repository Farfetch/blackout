import client, { adaptError } from '../helpers/client';
import type { PutDefaultBillingAddress } from './types';

/**
 * Sets the address specified with 'id', as the default billing address.
 *
 * @param props  - Put default billing Address query.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putDefaultBillingAddress: PutDefaultBillingAddress = (
  { userId, id },
  config,
) =>
  client
    .put(`/account/v1/users/${userId}/addresses/billing/${id}`, {}, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putDefaultBillingAddress;
