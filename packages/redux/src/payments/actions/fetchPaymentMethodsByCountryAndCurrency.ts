import { fetchPaymentMethodsByCountryAndCurrencyFactory } from './factories';
import { getPaymentMethodsByCountryAndCurrency } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment methods by country and currency.
 */
export default fetchPaymentMethodsByCountryAndCurrencyFactory(
  getPaymentMethodsByCountryAndCurrency,
);
