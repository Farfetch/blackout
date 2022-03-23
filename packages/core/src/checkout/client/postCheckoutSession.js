import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PostCheckoutSessionData
 *
 * @alias PostCheckoutSessionData
 * @memberof module:checkout/client
 *
 * @property {{productId: number, variantId:string, quantity: number}[]} [items] - List of items.
 * @property {number} [orderId] - Order identifier.
 * @property {object[]} [addresses] - List of addresses.
 * @property {{email: string}} customer -  All customer related data.
 * @property {object} metadata - Metadata.
 * @property {string} channel - Mode of the session being created (e.g., web, app).
 */

/**
 * Method responsible for creating an checkout session.
 *
 * @function postChechoutSession
 * @memberof module:checkout/client
 *
 * @param {PostCheckoutSessionData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post(join('/checkoutsession'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
