import { fetchPaymentMethodsByCountryAndCurrencyFactory } from './factories';
import { getPaymentMethodsByCountryAndCurrency } from '@farfetch/blackout-client';

/**
 * Fetch payment methods by country and currency.
 */
export default fetchPaymentMethodsByCountryAndCurrencyFactory(
  getPaymentMethodsByCountryAndCurrency,
);
