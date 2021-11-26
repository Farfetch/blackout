import { putInstruments } from '@farfetch/blackout-client/payments';
import { updateInstrumentsFactory } from './factories';

/**
 * Update instruments.
 *
 * @memberof module:payments/actions
 *
 * @name updateInstruments
 *
 * @type {UpdateInstrumentsThunkFactory}
 */
export default updateInstrumentsFactory(putInstruments);
