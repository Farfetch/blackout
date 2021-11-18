import {
  GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE,
  GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
  GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPaymentMethodsByCountryAndCurrencyThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains all the payment methods available for the current country and currency context.
 *
 * @function doGetPaymentMethodsByCountryAndCurrency
 * @memberof module:payments/actions
 *
 * @param {Function} getPaymentMethodsByCountryAndCurrency - Get payment methods by country and currency client.
 *
 * @returns {GetPaymentMethodsByCountryAndCurrencyThunkFactory} Thunk factory.
 */
export default getPaymentMethodsByCountryAndCurrency =>
  config =>
  async dispatch => {
    dispatch({
      type: GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
    });

    try {
      const result = await getPaymentMethodsByCountryAndCurrency(config);

      dispatch({
        payload: result,
        type: GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE,
      });

      throw error;
    }
  };
