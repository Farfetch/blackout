import { fetchPaymentMethodsByIntentFactory } from './factories/index.js';
import { getPaymentMethodsByIntent } from '@farfetch/blackout-client';

/**
 * Fetch payment methods.
 */
export default fetchPaymentMethodsByIntentFactory(getPaymentMethodsByIntent);
