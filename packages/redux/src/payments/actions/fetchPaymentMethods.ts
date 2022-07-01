import { fetchPaymentMethodsFactory } from './factories';
import { getPaymentMethods } from '@farfetch/blackout-client';

/**
 * Fetch payment methods.
 */
export default fetchPaymentMethodsFactory(getPaymentMethods);
