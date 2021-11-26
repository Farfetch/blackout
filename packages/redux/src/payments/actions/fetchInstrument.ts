import { fetchInstrumentFactory } from './factories';
import { getInstrument } from '@farfetch/blackout-client/payments';

/**
 * Fetch instrument.
 *
 * @memberof module:payments/actions
 *
 * @name fetchInstrument
 *
 * @type {FetchInstrumentThunkFactory}
 */
export default fetchInstrumentFactory(getInstrument);
