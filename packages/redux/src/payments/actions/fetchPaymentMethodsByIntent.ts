import { fetchPaymentMethodsByIntentFactory } from './factories';
import { getPaymentMethodsByIntent } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment methods.
 */
export default fetchPaymentMethodsByIntentFactory(getPaymentMethodsByIntent);
