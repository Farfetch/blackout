import { putUserDefaultPersonalId } from '@farfetch/blackout-client/users';
import { setDefaultPersonalIdFactory } from './factories';

/**
 * Updates the default personal id.
 */
export default setDefaultPersonalIdFactory(putUserDefaultPersonalId);
