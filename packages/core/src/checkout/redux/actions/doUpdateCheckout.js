import { normalize } from 'normalizr';
import {
  UPDATE_CHECKOUT_FAILURE,
  UPDATE_CHECKOUT_REQUEST,
  UPDATE_CHECKOUT_SUCCESS,
} from '../actionTypes';
import checkoutSchema from '../../../entities/schemas/checkout';

/**
 * @typedef {object} UpdateCheckoutData
 * @property {string} [email] - Email.
 * @property {object} [shippingAddress] - Shipping Address.
 * @property {object} [billingAddress] - Billing Address.
 * @property {object} [clickAndCollect] - Click and Collect.
 * @property {object} [shippingOption] - Shipping Option.
 * @property {object} [deliveryBundleUpdate] - Delivery Bundle Update.
 */

/**
 * @callback UpdateCheckoutThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {UpdateCheckoutData} data - Checkout object.
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
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for changing the checkout information.
 * This is used for any type of changes to the checkout object.
 * This also replaces the deprecated putShippingOption function.
 *
 * @function doUpdateCheckout
 * @memberof module:checkout/actions
 *
 * @param {Function} patchCheckout - Patch checkout client.
 *
 * @returns {UpdateCheckoutThunkFactory} Thunk factory.
 */
export default patchCheckout => (id, data, config) => async dispatch => {
  dispatch({
    type: UPDATE_CHECKOUT_REQUEST,
  });

  try {
    const response = await patchCheckout(id, data, config);

    dispatch({
      payload: normalize(response, checkoutSchema),
      type: UPDATE_CHECKOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: UPDATE_CHECKOUT_FAILURE,
    });

    throw error;
  }
};
