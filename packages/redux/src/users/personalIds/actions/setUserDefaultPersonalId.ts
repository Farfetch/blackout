import { putUserDefaultPersonalId } from '@farfetch/blackout-client';
import { setUserDefaultPersonalIdFactory } from './factories/index.js';

/**
 * Updates the default personal id.
 */
export default setUserDefaultPersonalIdFactory(putUserDefaultPersonalId);
