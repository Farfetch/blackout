import {
  GET_PAYMENT_METHODS_FAILURE,
  GET_PAYMENT_METHODS_REQUEST,
  GET_PAYMENT_METHODS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPaymentMethodsThunkFactory
 * @param {string} id - Universal identifier of the order.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading the payment methods.
 *
 * @function doGetPaymentMethods
 * @memberof module:payments/actions
 *
 * @param {Function} getPaymentMethods - Get payment methods client.
 *
 * @returns {GetPaymentMethodsThunkFactory} Thunk factory.
 */
export default getPaymentMethods => (orderId, config) => async dispatch => {
  dispatch({
    type: GET_PAYMENT_METHODS_REQUEST,
  });

  try {
    const result = await getPaymentMethods(orderId, config);

    dispatch({
      payload: {
        entities: {
          checkout: {
            [orderId]: {
              paymentMethods: result,
            },
          },
        },
      },
      type: GET_PAYMENT_METHODS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PAYMENT_METHODS_FAILURE,
    });

    throw error;
  }
};
