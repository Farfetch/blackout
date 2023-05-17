import { putPaymentIntentInstrument } from '@farfetch/blackout-client';
import { updatePaymentIntentInstrumentFactory } from './factories/index.js';

/**
 * Update payment intent instrument.
 */
export default updatePaymentIntentInstrumentFactory(putPaymentIntentInstrument);
