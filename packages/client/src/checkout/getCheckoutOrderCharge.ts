import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetCheckoutOrderCharge } from './types';

/**
 * Method responsible for getting the orderCharge.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param chargeId        - Alphanumeric guid of the charge.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderCharge: GetCheckoutOrderCharge = (
  checkoutOrderId,
  chargeId,
  config,
) =>
  client
    .get(
      join('/checkout/v1/orders', checkoutOrderId, 'charges', chargeId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderCharge;
