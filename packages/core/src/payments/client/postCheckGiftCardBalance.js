import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostCheckGiftCardBalanceData
 *
 * @alias PostCheckGiftCardBalanceData
 * @memberof module:payments/client
 *
 * @property {string} giftCardNumber - Giftcard number.
 * @property {string} giftCardCsc - Gitfcard Csc.
 */

/**
 * Method responsible for getting the gift card balance.
 *
 * @function postCheckGiftCardBalance
 * @memberof module:payments/client
 *
 * @param {PostCheckGiftCardBalanceData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post('/payment/v1/checkGiftCardBalance', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
