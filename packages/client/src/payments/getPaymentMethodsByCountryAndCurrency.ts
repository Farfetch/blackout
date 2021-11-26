import client, { adaptError } from '../helpers/client';
import type { GetPaymentMethodsByCountryAndCurrency } from './types';

/**
 * Method responsible for fetching payment methods available for given country and currency context.
 *
 * @function getPaymentMethodsByCountryAndCurrency
 * @memberof module:payments/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getPaymentMethodsByCountryAndCurrency: GetPaymentMethodsByCountryAndCurrency =
  config =>
    client
      .get('/payment/v1/paymentmethods', config)
      .then(response => response.data)
      .catch(error => {
        throw adaptError(error);
      });

export default getPaymentMethodsByCountryAndCurrency;
