import {
  CREATE_CHECKOUT_FAILURE,
  CREATE_CHECKOUT_REQUEST,
  CREATE_CHECKOUT_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';

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
 * @typedef {object} CreateCheckoutData
 * @property {string} bagId - Universal identifier of the Bag.
 * @property {Array<Items>} items - Items list to create the checkout order. This can be used instead of the bagId.
 * @property {string} [shippingMode] - Shipping mode. Possible values:
 * ByMerchant, ByBundle.
 * By default it will be applied shipping mode = 'ByMerchant'.
 *
 * @property {string} [guestUserEmail] - Guest user email.
 * @property {boolean} [removePurchasedItemsFromBag] - Indicates if the products in the requested order should be removed from the bag when the order is placed.
 * Only purchased products are removed from the bag.
 * Should be used only when checkout order is created with items list.
 */

/**
 * @callback CreateCheckoutThunkFactory
 * @param {CreateCheckoutData} data - Data to create the checkout.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating the checkout order.
 * Note:
 * The checkout entity state will contains the orderStatus which is
 * used to keep track of the latest error when creating a new checkout order.
 *
 *
 * @function doCreateCheckout
 * @memberof module:checkout/actions
 *
 * @param {Function} postCheckout - Post checkout client.
 *
 * @returns {CreateCheckoutThunkFactory} Thunk factory.
 */
export default postCheckout => (data, config) => async dispatch => {
  dispatch({
    type: CREATE_CHECKOUT_REQUEST,
  });

  try {
    const result = await postCheckout(data, config);

    dispatch({
      payload: normalize(result, checkoutSchema),
      type: CREATE_CHECKOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: CREATE_CHECKOUT_FAILURE,
    });

    throw error;
  }
};
