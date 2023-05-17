import { fetchCheckoutOrderPaymentMethodsFactory } from './factories/index.js';
import { getCheckoutOrderPaymentMethods } from '@farfetch/blackout-client';

/**
 * Fetch checkout order payment methods.
 */
export default fetchCheckoutOrderPaymentMethodsFactory(
  getCheckoutOrderPaymentMethods,
);
