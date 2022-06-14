import { createPersonalIdsFactory } from './factories';
import { postUserPersonalIds } from '@farfetch/blackout-client/users';

/**
 * Create personal ids.
 */
export default createPersonalIdsFactory(postUserPersonalIds);
