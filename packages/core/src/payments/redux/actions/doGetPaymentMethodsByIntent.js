import {
  GET_PAYMENT_METHODS_BY_INTENT_FAILURE,
  GET_PAYMENT_METHODS_BY_INTENT_REQUEST,
  GET_PAYMENT_METHODS_BY_INTENT_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPaymentMethodsByIntentThunkFactory
 * @param {string} id       - Id of the payment intent.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains all the payment methods available for the intent.
 *
 * @function doGetPaymentMethodsByIntent
 * @memberof module:payments/actions
 *
 * @param {Function} getPaymentMethodsByIntent - Get payment methods by intent.
 *
 * @returns {GetPaymentMethodsByIntentThunkFactory} Thunk factory.
 */
export default getPaymentMethodsByIntent => (id, config) => async dispatch => {
  dispatch({
    type: GET_PAYMENT_METHODS_BY_INTENT_REQUEST,
  });

  try {
    const result = await getPaymentMethodsByIntent(id, config);

    dispatch({
      payload: result,
      type: GET_PAYMENT_METHODS_BY_INTENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PAYMENT_METHODS_BY_INTENT_FAILURE,
    });

    throw error;
  }
};
