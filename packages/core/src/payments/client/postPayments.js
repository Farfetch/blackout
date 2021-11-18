import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PostPaymentsData
 *
 * @alias PostPaymentsData
 * @memberof module:payments/client
 *
 * @property {string} paymentMethodId - Payment method id.
 * @property {string} cardNumber - Card number.
 * @property {string} cardName - Card name.
 * @property {number} cardExpiryMonth - Card expiry month.
 * @property {number} cardExpiryYear - Card expiry year.
 * @property {string} cardCvv - Card cvv.
 * @property {boolean} savePaymentMethodAsToken - Should save as token.
 * @property {string} paymentMethodType - Payment method type.
 * @property {string} paymentTokenId - Payment token id.
 */

/**
 * Method responsible for finalizing (paying) an order.
 *
 * @function postPayments
 * @memberof module:payments/client
 *
 * @param {string} id - Universal identifier of the order.
 * @param {PostPaymentsData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .post(join('/checkout/v1/orders', id, 'finalize'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
