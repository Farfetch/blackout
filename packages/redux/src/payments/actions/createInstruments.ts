import { createInstrumentsFactory } from './factories';
import { postInstruments } from '@farfetch/blackout-client/payments';

/**
 * Create instruments.
 */
export default createInstrumentsFactory(postInstruments);
