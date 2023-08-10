import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PatchCheckoutSession } from './types/index.js';

/**
 * Method responsible for changing the checkout session information. This is used for any
 * type of changes to the checkout session object.
 *
 * @param checkoutSessionId - Universal identifier of the Checkout Session.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchCheckoutSession: PatchCheckoutSession = (
  checkoutSessionId,
  data,
  config,
) =>
  client
    .patch(
      join('/checkout/v1/checkoutSessions/', checkoutSessionId),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckoutSession;
