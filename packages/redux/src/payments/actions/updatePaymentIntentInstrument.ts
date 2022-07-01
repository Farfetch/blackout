import { putPaymentIntentInstrument } from '@farfetch/blackout-client';
import { updatePaymentIntentInstrumentFactory } from './factories';

/**
 * Update payment intent instrument.
 */
export default updatePaymentIntentInstrumentFactory(putPaymentIntentInstrument);
