import { deletePaymentIntentInstrument } from '@farfetch/blackout-client';
import { removePaymentIntentInstrumentFactory } from './factories/index.js';

/**
 * Remove payment intent instrument.
 */
export default removePaymentIntentInstrumentFactory(
  deletePaymentIntentInstrument,
);
