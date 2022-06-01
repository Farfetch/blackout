import { fetchInstrumentFactory } from './factories';
import { getInstrument } from '@farfetch/blackout-client/payments';

/**
 * Fetch instrument.
 */
export default fetchInstrumentFactory(getInstrument);
