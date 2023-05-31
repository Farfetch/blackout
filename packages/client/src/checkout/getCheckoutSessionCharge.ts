import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutSessionCharge } from './types/getCheckoutSessionCharge.types.js';

/**
 * Method responsible for getting the checkout session charge.
 *
 * @param checkoutSessionId - Id of the checkout session to get the charge from.
 * @param chargeId          - Alphanumeric guid of the charge.
 * @param config            - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutSessionCharge: GetCheckoutSessionCharge = (
  checkoutSessionId,
  chargeId,
  config,
) =>
  client
    .get(
      join(
        '/checkout/v1/checkoutSessions',
        checkoutSessionId,
        'charges',
        chargeId,
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutSessionCharge;
