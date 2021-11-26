import { fetchPaymentMethodsByCountryAndCurrencyFactory } from './factories';
import { getPaymentMethodsByCountryAndCurrency } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment methods by country and currency.
 *
 * @memberof module:payments/actions
 *
 * @name fetchPaymentMethodsByCountryAndCurrency
 *
 * @type {FetchPaymentMethodsByCountryAndCurrencyThunkFactory}
 */
export default fetchPaymentMethodsByCountryAndCurrencyFactory(
  getPaymentMethodsByCountryAndCurrency,
);
