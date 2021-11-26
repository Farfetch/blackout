import { createInstrumentsFactory } from './factories';
import { postInstruments } from '@farfetch/blackout-client/payments';

/**
 * Create instruments.
 *
 * @memberof module:payments/actions
 *
 * @name createInstruments
 *
 * @type {CreateInstrumentsThunkFactory}
 */
export default createInstrumentsFactory(postInstruments);
