import client, { adaptError } from '../../helpers/client';

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
export default config =>
  client
    .get('/payment/v1/paymentmethods', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
