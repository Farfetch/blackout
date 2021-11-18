import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostCheckCreditBalanceData
 *
 * @alias PostCheckCreditBalanceData
 * @memberof module:payments/client
 *
 * @property {string} creditUserId - Identifier of the Credit User.
 */

/**
 * Method responsible for getting the user credit balance.
 *
 * @function postCheckCreditBalance
 * @memberof module:payments/client
 *
 * @param {PostCheckCreditBalanceData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post('/payment/v1/checkCreditBalance', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
