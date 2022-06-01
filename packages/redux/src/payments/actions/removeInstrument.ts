import { deleteInstrument } from '@farfetch/blackout-client/payments';
import { removeInstrumentFactory } from './factories';

/**
 * Remove instrument.
 */
export default removeInstrumentFactory(deleteInstrument);
