import { deleteUserPersonalId } from '@farfetch/blackout-client/users';
import { removePersonalIdFactory } from './factories';

/**
 * Removes a personal id.
 */
export default removePersonalIdFactory(deleteUserPersonalId);
