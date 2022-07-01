import { fetchPaymentIntentInstrumentsFactory } from './factories';
import { getPaymentIntentInstruments } from '@farfetch/blackout-client';

/**
 * Fetch payment intent instruments.
 */
export default fetchPaymentIntentInstrumentsFactory(
  getPaymentIntentInstruments,
);
