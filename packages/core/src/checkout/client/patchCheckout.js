import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PatchCheckoutData
 *
 * @alias PatchCheckoutData
 * @memberof module:checkout/client
 *
 * @property {string} [email] - Email.
 * @property {object} [shippingAddress] - Shipping Address Data.
 * @property {object} [billingAddress] - Billing Address Data.
 * @property {object} [clickAndCollect] - Click and collect Data.
 * @property {object} [shippingOption] - Shipping Option Data.
 * @property {object} [deliveryBundleUpdate] - Delivery Bundle Update.
 */

/**
 * Method responsible for changing the checkout information.
 * This is used for any type of changes to the checkout object.
 * This also replaces the deprecated putShippingOption function.
 *
 * @function patchCheckout
 * @memberof module:checkout/client
 *
 * @param {string} id - Universal identifier of the Checkout.
 * @param {PatchCheckoutData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * In this case is truly recommended to update your axios config to
 * your new shipping or billing address, like this:
 * const config = {
 *     headers: {
 *          'Accept-Language': cultureCode,
 *          'FF-Country': countryCode,
 *          'FF-Currency': currencyCode
 *     }.
 * }.
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .patch(join('/checkout/v1/orders/', id), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
