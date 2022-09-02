import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetGuestOrderLegacy } from './types';

// TODO: Remove this client when it is not necessary anymore
// and any legacy typescript types that are defined by it.

/**
 * Method responsible for fetching the details of a guest user order.
 * Uses the legacy method which requires cookies.
 *
 * @param orderId - The orderID to get the details.
 * @param guestUserEmail - The guest user email.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 *
 */
const getGuestOrderLegacy: GetGuestOrderLegacy = (
  orderId,
  guestUserEmail,
  config,
) => {
  return client
    .get(
      join('/legacy/v1/guestorders/', orderId, { query: { guestUserEmail } }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getGuestOrderLegacy;
