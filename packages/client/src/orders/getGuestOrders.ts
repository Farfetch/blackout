import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import isString from 'lodash/isString';
import join from 'proper-url-join';
import type { GetGuestOrders, GetGuestOrdersQuery } from './types';

/**
 * Method responsible for fetching the details of an guest user order list.
 *
 * @param guestUserEmail - The guest user email.
 * @param config         - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 *
 */
export const getGuestOrder: GetGuestOrders = (guestUserEmail, config) => {
  const containsGuestUserEmail = isString(guestUserEmail);
  const args: [string, GetGuestOrdersQuery?] = containsGuestUserEmail
    ? ['/legacy/v1/guestorders/', { query: { guestUserEmail } }]
    : ['/account/v1/guestorders/'];
  return client
    .get(join(...args), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
