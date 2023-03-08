import { fetchPaymentIntentInstrumentsFactory } from './factories/index.js';
import { getPaymentIntentInstruments } from '@farfetch/blackout-client';

/**
 * Fetch payment intent instruments.
 */
export default fetchPaymentIntentInstrumentsFactory(
  getPaymentIntentInstruments,
);
