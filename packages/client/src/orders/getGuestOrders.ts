import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { GetGuestOrders } from './types/index.js';

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
