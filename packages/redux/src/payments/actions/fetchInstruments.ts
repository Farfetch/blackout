import { fetchInstrumentsFactory } from './factories';
import { getInstruments } from '@farfetch/blackout-client/payments';

/**
 * Fetch instruments.
 *
 * @memberof module:payments/actions
 *
 * @name fetchInstruments
 *
 * @type {FetchInstrumentsThunkFactory}
 */
export default fetchInstrumentsFactory(getInstruments);
