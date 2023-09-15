import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCheckoutSessionTags } from './types/getCheckoutSessionTags.types.js';

/**
 * Method responsible for getting the checkout session tags.
 *
 * @param checkoutSessionId - Id of the checkout session to get.
 * @param config            - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutSessionTags: GetCheckoutSessionTags = (
  checkoutSessionId,
  config,
) =>
  client
    .get(
      join('/checkout/v1/checkoutSessions', checkoutSessionId, 'tags'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutSessionTags;
