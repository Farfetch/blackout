import { fetchPaymentMethodsFactory } from './factories';
import { getPaymentMethods } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment methods.
 */
export default fetchPaymentMethodsFactory(getPaymentMethods);
