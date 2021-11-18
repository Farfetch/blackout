import {
  GET_CHECKOUT_FAILURE,
  GET_CHECKOUT_REQUEST,
  GET_CHECKOUT_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';

/**
 * @typedef {object} GetCheckoutQuery
 * @property {string} [fields] - Get the order only with the specified
 * fields, separated by commas. Possible values: checkoutOrder, paymentMethods,
 * shippingOptions or deliveryBundles, userPaymentTokens.
 */

/**
 * @callback GetCheckoutThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {GetCheckoutQuery} [query] - Query params to retrieve the checkout.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the checkout.
 *
 * @function doGetCheckout
 * @memberof module:checkout/actions
 *
 * @param {Function} getCheckout - Get checkout client.
 *
 * @returns {GetCheckoutThunkFactory} Thunk factory.
 */
export default getCheckout => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_CHECKOUT_REQUEST,
  });

  try {
    const result = await getCheckout(id, query, config);

    dispatch({
      payload: normalize(result, checkoutSchema),
      type: GET_CHECKOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_CHECKOUT_FAILURE,
    });

    throw error;
  }
};
