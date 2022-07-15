import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import isString from 'lodash/isString';
import join from 'proper-url-join';
import type { GetGuestOrder, GetGuestOrdersQuery } from './types';

/**
 * Method responsible for fetching the details of an guest user order.
 *
 * @param orderId - The orderID to get the details.
 * @param guestUserEmail - The guest user email.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 *
 */
export const getGuestOrder: GetGuestOrder = (
  orderId,
  guestUserEmail,
  config,
) => {
  const containsGuestUserEmail = isString(guestUserEmail);
  const args: [string, string, GetGuestOrdersQuery?] = containsGuestUserEmail
    ? ['/legacy/v1/guestorders/', orderId, { query: { guestUserEmail } }]
    : ['/account/v1/guestorders/', orderId];
  return client
    .get(join(...args), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
