import { fetchCheckoutOrderPaymentMethodsFactory } from './factories';
import { getCheckoutOrderPaymentMethods } from '@farfetch/blackout-client';

/**
 * Fetch checkout order payment methods.
 */
export default fetchCheckoutOrderPaymentMethodsFactory(
  getCheckoutOrderPaymentMethods,
);
