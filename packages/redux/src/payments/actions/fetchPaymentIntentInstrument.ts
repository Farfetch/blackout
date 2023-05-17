import { fetchPaymentIntentInstrumentFactory } from './factories/index.js';
import { getPaymentIntentInstrument } from '@farfetch/blackout-client';

/**
 * Fetch payment intent instrument.
 */
export default fetchPaymentIntentInstrumentFactory(getPaymentIntentInstrument);
