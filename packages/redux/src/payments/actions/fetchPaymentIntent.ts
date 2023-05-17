import { fetchPaymentIntentFactory } from './factories/index.js';
import { getPaymentIntent } from '@farfetch/blackout-client';

/**
 * Fetch payment intent.
 */
export default fetchPaymentIntentFactory(getPaymentIntent);
