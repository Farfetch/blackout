import { fetchInstrumentsFactory } from './factories';
import { getInstruments } from '@farfetch/blackout-client/payments';

/**
 * Fetch instruments.
 */
export default fetchInstrumentsFactory(getInstruments);
