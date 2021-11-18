import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostTransactionData
 *
 * @alias PostTransactionData
 * @memberof module:payments/client
 *
 * @property {boolean} paymentMethodId - Payment method id.
 * @property {boolean} paymentMethodType - Payment method type.
 */

/**
 * Method responsible for paying a Transaction.
 *
 * @function postTransaction
 * @memberof module:payments/client
 *
 * @param {number} id - Transaction id.
 * @param {PostTransactionData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .post(`/checkout/v1/transactions/${id}/charges`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
