import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PostApplePaySessionData
 *
 * @alias PostApplePaySessionData
 * @memberof module:payments/client
 *
 * @property {string} validationUrl - Set the validation url to get the Merchant session.
 *
 */

/**
 * Method responsible for creating an apple pay session.
 *
 * @function postApplePaySession
 * @memberof module:payments/client
 *
 * @param {PostApplePaySessionData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post(join('/payment/v1/applepaysession'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
