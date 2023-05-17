import { deleteUserPersonalId } from '@farfetch/blackout-client';
import { removeUserPersonalIdFactory } from './factories/index.js';

/**
 * Removes a personal id.
 */
export default removeUserPersonalIdFactory(deleteUserPersonalId);
