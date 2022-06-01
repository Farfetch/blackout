import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PatchCheckoutCompletePayment } from './types';

/**
 * Attempts to complete the payment of a checkout order.
 *
 * @param id     - Identifier of the transaction.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchCheckoutCompletePayment: PatchCheckoutCompletePayment = (
  id,
  data,
  config,
) =>
  client
    .patch(join('/payment/v1/payments', id), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckoutCompletePayment;
