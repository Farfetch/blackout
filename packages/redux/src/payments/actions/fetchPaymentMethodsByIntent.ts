import { fetchPaymentMethodsByIntentFactory } from './factories';
import { getPaymentMethodsByIntent } from '@farfetch/blackout-client';

/**
 * Fetch payment methods.
 */
export default fetchPaymentMethodsByIntentFactory(getPaymentMethodsByIntent);
