import {
  FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE,
  FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
  FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsByCountryAndCurrencyAction } from '../../types';
import type {
  GetPaymentMethodsByCountryAndCurrency,
  PaymentMethods,
} from '@farfetch/blackout-client/payments/types';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
  ): Promise<PaymentMethods> => {
    try {
      dispatch({
        type: FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST,
      });

      const result = await getPaymentMethodsByCountryAndCurrency(config);

      dispatch({
        payload: result,
        type: FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentMethodsByCountryAndCurrencyFactory;
