import { patchUserPersonalId } from '@farfetch/blackout-client';
import { updateUserPersonalIdFactory } from './factories/index.js';

/**
 * Updates a specific personal id.
 */
export default updateUserPersonalIdFactory(patchUserPersonalId);
