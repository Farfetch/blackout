import { createPersonalIdsFactory } from './factories';
import { postPersonalIds } from '@farfetch/blackout-client/users';

/**
 * Create personal ids.
 */
export default createPersonalIdsFactory(postPersonalIds);
