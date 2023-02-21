import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetPaymentMethodsByCountryAndCurrency,
  type PaymentMethods,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsByCountryAndCurrencyAction } from '../../types';

/**
 * Obtains all the payment methods available for the current country and currency
 * context.
 *
 * @param getPaymentMethodsByCountryAndCurrency - Get payment methods by country and currency client.
 *
 * @returns Thunk factory.
 */
const fetchPaymentMethodsByCountryAndCurrencyFactory =
  (
    getPaymentMethodsByCountryAndCurrency: GetPaymentMethodsByCountryAndCurrency,
  ) =>
  (config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentMethodsByCountryAndCurrencyAction>,
  ): Promise<PaymentMethods[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
      });

      const result = await getPaymentMethodsByCountryAndCurrency(config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPaymentMethodsByCountryAndCurrencyFactory;
