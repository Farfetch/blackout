import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutCheckoutSessionTags } from './types/index.js';

/**
 * Method responsible for setting tags for the checkout session.
 *
 * @param checkoutSessionId - Universal identifier of the Checkout Session.
 * @param data   - Tags data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putCheckoutSessionTags: PutCheckoutSessionTags = (
  checkoutSessionId,
  data,
  config,
) =>
  client
    .put(
      join('/checkout/v1/checkoutSessions', checkoutSessionId, 'tags'),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putCheckoutSessionTags;
