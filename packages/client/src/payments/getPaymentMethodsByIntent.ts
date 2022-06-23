import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetPaymentMethodsByIntent } from './types';

/**
 * Method responsible for fetching payment methods available for given intent id.
 *
 * @param id     - Id of the payment Intent.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentMethodsByIntent: GetPaymentMethodsByIntent = (id, config) =>
  client
    .get(join('/payment/v1/intents', id, 'paymentmethods'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentMethodsByIntent;
