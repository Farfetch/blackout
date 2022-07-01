import { createPaymentIntentInstrumentFactory } from './factories';
import { postPaymentIntentInstrument } from '@farfetch/blackout-client';

/**
 * Create payment intent instrument.
 */
export default createPaymentIntentInstrumentFactory(
  postPaymentIntentInstrument,
);
