import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetCheckoutQuery
 *
 * @alias GetCheckoutQuery
 * @memberof module:checkout/client
 *
 * @property {string} [fields] - Get the order only with the specified
 * fields, separated by commas. Possible values: checkoutOrder, paymentMethods,
 * shippingOptions or deliveryBundles, userPaymentTokens.
 */

/**
 * Method responsible for loading the checkout.
 *
 * @function getCheckout
 * @memberof module:checkout/client
 *
 * @param {string} id - Universal identifier of the Checkout.
 * @param {GetCheckoutQuery} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(join('/checkout/v1/orders/', id, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
