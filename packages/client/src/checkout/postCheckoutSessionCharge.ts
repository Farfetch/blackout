import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostCheckoutSessionCharge } from './types/postCheckoutSessionCharge.types.js';

/**
 * Method responsible for creating a checkout session charge.
 *
 * @param checkoutSessionId - Id of the checkout session to charge.
 * @param data              - Request data.
 * @param config            - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postCheckoutSessionCharge: PostCheckoutSessionCharge = (
  checkoutSessionId,
  data,
  config,
) =>
  client
    .post(
      join('/checkout/v1/checkoutSessions', checkoutSessionId, 'charges'),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postCheckoutSessionCharge;
