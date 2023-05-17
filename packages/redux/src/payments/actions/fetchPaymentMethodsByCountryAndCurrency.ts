import { fetchPaymentMethodsByCountryAndCurrencyFactory } from './factories/index.js';
import { getPaymentMethodsByCountryAndCurrency } from '@farfetch/blackout-client';

/**
 * Fetch payment methods by country and currency.
 */
export default fetchPaymentMethodsByCountryAndCurrencyFactory(
  getPaymentMethodsByCountryAndCurrency,
);
