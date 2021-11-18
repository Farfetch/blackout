import {
  GET_CHECKOUT_DETAILS_FAILURE,
  GET_CHECKOUT_DETAILS_REQUEST,
  GET_CHECKOUT_DETAILS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import checkoutDetailsSchema from '../../../entities/schemas/checkoutDetails';

/**
 * @callback GetCheckoutDetailsThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {object} [query] - Query params to retrieve the checkout details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the checkout details.
 * These are used for the order confirmation.
 *
 * @function doGetCheckoutDetails
 * @memberof module:checkout/actions
 *
 * @param {Function} getCheckoutDetails - Get checkout details client.
 *
 * @returns {GetCheckoutDetailsThunkFactory} Thunk factory.
 */
export default getCheckoutDetails => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_CHECKOUT_DETAILS_REQUEST,
  });

  try {
    const result = await getCheckoutDetails(id, query, config);

    dispatch({
      meta: { id },
      payload: normalize(result, checkoutDetailsSchema),
      type: GET_CHECKOUT_DETAILS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_CHECKOUT_DETAILS_FAILURE,
    });

    throw error;
  }
};
