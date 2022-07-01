import { fetchPaymentIntentInstrumentFactory } from './factories';
import { getPaymentIntentInstrument } from '@farfetch/blackout-client';

/**
 * Fetch payment intent instrument.
 */
export default fetchPaymentIntentInstrumentFactory(getPaymentIntentInstrument);
