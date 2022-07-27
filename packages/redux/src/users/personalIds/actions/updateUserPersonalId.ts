import { patchUserPersonalId } from '@farfetch/blackout-client';
import { updateUserPersonalIdFactory } from './factories';

/**
 * Updates a specific personal id.
 */
export default updateUserPersonalIdFactory(patchUserPersonalId);
