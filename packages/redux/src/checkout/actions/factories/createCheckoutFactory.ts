import {
  CREATE_CHECKOUT_FAILURE,
  CREATE_CHECKOUT_REQUEST,
  CREATE_CHECKOUT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PostCheckout,
  PostCheckoutData,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @typedef {object} Items
 *
 * @alias Items
 *
 * @property {number} merchantId - The Merchant identifier.
 * @property {string} variantId - The Variant identifier.
 * @property {number} productId - The Product identifier.
 * @property {number} [quantity] - The quantity.
 * @property {string} [customAttributes] - Custom atributes.
 * @property {number} [productAggregatorId] - The Product aggregator identifier.
 */

/**
 * @typedef {object} CreateCheckoutData
 *
 * @alias CreateCheckoutData
 *
 * @property {string} bagId - Universal identifier of the Bag.
 * @property {Array<Items>} items - Items list to create the checkout order. This can be used instead of the bagId.
 * @property {string} [shippingMode='ByMerchant'] - Shipping mode. Possible values: ByMerchant, ByBundle.
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
 * @function createCheckoutFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} postCheckout - Post checkout client.
 *
 * @returns {CreateCheckoutThunkFactory} Thunk factory.
 */
const createCheckoutFactory =
  (postCheckout: PostCheckout) =>
  (data: PostCheckoutData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    dispatch({
      type: CREATE_CHECKOUT_REQUEST,
    });

    try {
      const result = await postCheckout(data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: CREATE_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };

export default createCheckoutFactory;
