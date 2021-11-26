import client, { adaptError } from '../helpers/client';
import type { PostCheckout } from './types';

/**
 * @typedef {object} Items
 * @property {number} merchantId - The Merchant identifier.
 * @property {string} variantId - The Variant identifier.
 * @property {number} productId - The Product identifier.
 * @property {number} [quantity] - The quantity.
 * @property {string} [customAttributes] - Custom atributes.
 * @property {number} [productAggregatorId] - The Product aggregator identifier.
 */

/**
 * @typedef {object} PostCheckoutData
 *
 * @alias PostCheckoutData
 * @memberof module:checkout/client
 *
 * @property {string} bagId - Universal identifier of the Bag to create the checkout order.
 * @property {Array<Items>} items - Items list to create the checkout order. This can be used instead of the bagId.
 * @property {string} [shippingMode] - Shipping mode. Possible values:
 * ByMerchant, ByBundle.
 * By default it will be applied shipping mode = 'ByMerchant'.
 *
 * @property {string} [guestUserEmail] - Guest user email.
 * @property {boolean} [removePurchasedItemsFromBag] - Indicates if the products in the requested order should be removed from the bag when the order is placed.
 * Only purchased products are removed from the bag.
 * Should be used only when checkout order is created with items list.
 *
 
/**
 * Method responsible for creating the checkout order.
 * Note:
 * The checkout entity state will contains the orderStatus which is
 * used to keep track of the latest error when creating a new checkout order.
 *
 * @function postCheckout
 * @memberof module:checkout/client
 *
 * @param {PostCheckoutData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 *
 */
const postCheckout: PostCheckout = (data, config) =>
  client
    .post('/checkout/v1/orders', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postCheckout;
