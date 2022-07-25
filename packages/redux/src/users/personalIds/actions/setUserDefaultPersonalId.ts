import { putUserDefaultPersonalId } from '@farfetch/blackout-client';
import { setUserDefaultPersonalIdFactory } from './factories';

/**
 * Updates the default personal id.
 */
export default setUserDefaultPersonalIdFactory(putUserDefaultPersonalId);
