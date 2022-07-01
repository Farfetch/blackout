import { fetchPaymentIntentFactory } from './factories';
import { getPaymentIntent } from '@farfetch/blackout-client';

/**
 * Fetch payment intent.
 */
export default fetchPaymentIntentFactory(getPaymentIntent);
