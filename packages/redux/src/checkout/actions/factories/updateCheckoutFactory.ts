import { normalize } from 'normalizr';
import {
  UPDATE_CHECKOUT_FAILURE,
  UPDATE_CHECKOUT_REQUEST,
  UPDATE_CHECKOUT_SUCCESS,
} from '../../actionTypes';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PatchCheckout,
  PatchCheckoutData,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @typedef {object} UpdateCheckoutData
 *
 * @alias UpdateCheckoutData
 *
 * @property {string} [email] - Email.
 * @property {object} [shippingAddress] - Shipping Address.
 * @property {object} [billingAddress] - Billing Address.
 * @property {object} [clickAndCollect] - Click and Collect.
 * @property {object} [shippingOption] - Shipping Option.
 * @property {object} [deliveryBundleUpdate] - Delivery Bundle Update.
 */

/**
 * @callback UpdateCheckoutThunkFactory
 * @param {number} id - Universal identifier of the Checkout.
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
 * @function updateCheckoutFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} patchCheckout - Patch checkout client.
 *
 * @returns {UpdateCheckoutThunkFactory} Thunk factory.
 */
const updateCheckoutFactory =
  (patchCheckout: PatchCheckout) =>
  (id: number, data: PatchCheckoutData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    dispatch({
      type: UPDATE_CHECKOUT_REQUEST,
    });

    try {
      const result = await patchCheckout(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: UPDATE_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };

export default updateCheckoutFactory;
