import { deleteInstrument } from '@farfetch/blackout-client/payments';
import { removeInstrumentFactory } from './factories';

/**
 * Remove instrument.
 *
 * @memberof module:payments/actions
 *
 * @name removeInstrument
 *
 * @type {RemoveInstrumentThunkFactory}
 */
export default removeInstrumentFactory(deleteInstrument);
