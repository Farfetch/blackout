import { createPersonalIdsFactory } from './factories';
import { postPersonalIds } from '@farfetch/blackout-client/users';

/**
 * Create personal ids.
 *
 * @memberof module:users/actions
 *
 * @function createPersonalIds
 *
 * @type {CreatePersonalIdsThunkFactory}
 */
export default createPersonalIdsFactory(postPersonalIds);
