import {
  FETCH_CHECKOUT_FAILURE,
  FETCH_CHECKOUT_REQUEST,
  FETCH_CHECKOUT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckout,
  GetCheckoutQuery,
  GetCheckoutResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @typedef {object} FetchCheckoutQuery
 *
 * @alias FetchCheckoutQuery
 *
 * @property {string} [fields] - Get the order only with the specified
 * fields, separated by commas. Possible values: checkoutOrder, paymentMethods,
 * shippingOptions or deliveryBundles, userPaymentTokens.
 */

/**
 * @callback FetchCheckoutThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {FetchCheckoutQuery} [query] - Query params to retrieve the checkout.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the checkout.
 *
 * @function fetchCheckoutFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} getCheckout - Get checkout client.
 *
 * @returns {FetchCheckoutThunkFactory} Thunk factory.
 */
export default (getCheckout: GetCheckout) =>
  (id: number, query: GetCheckoutQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    dispatch({
      type: FETCH_CHECKOUT_REQUEST,
    });

    try {
      const result = await getCheckout(id, query, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: FETCH_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };
