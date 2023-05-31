import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutSession } from './types/getCheckoutSession.types.js';

/**
 * Method responsible for loading the checkout.
 *
 * @param checkoutSessionId - Id of the checkout session to get.
 * @param config            - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutSession: GetCheckoutSession = (checkoutSessionId, config) =>
  client
    .get(join('/checkout/v1/checkoutSessions/', checkoutSessionId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutSession;
