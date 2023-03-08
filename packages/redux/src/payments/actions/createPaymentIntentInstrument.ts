import { createPaymentIntentInstrumentFactory } from './factories/index.js';
import { postPaymentIntentInstrument } from '@farfetch/blackout-client';

/**
 * Create payment intent instrument.
 */
export default createPaymentIntentInstrumentFactory(
  postPaymentIntentInstrument,
);
