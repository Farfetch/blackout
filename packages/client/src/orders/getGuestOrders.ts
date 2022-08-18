import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { GetGuestOrders } from './types';

/**
 * Method responsible for fetching the details of a guest user order list.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getGuestOrders: GetGuestOrders = config => {
  return client
    .get('/account/v1/guestorders/', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getGuestOrders;
