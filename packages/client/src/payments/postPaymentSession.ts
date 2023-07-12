import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { PostPaymentSession } from './types/index.js';

/**
 * Method responsible for creating a payment session.
 *
 * @param data            - Request data.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postPaymentSession: PostPaymentSession = (data, config) =>
  client
    .post('/payment/v1/paymentsession', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postPaymentSession;
