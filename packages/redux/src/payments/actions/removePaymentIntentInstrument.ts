import { deletePaymentIntentInstrument } from '@farfetch/blackout-client';
import { removePaymentIntentInstrumentFactory } from './factories';

/**
 * Remove payment intent instrument.
 */
export default removePaymentIntentInstrumentFactory(
  deletePaymentIntentInstrument,
);
