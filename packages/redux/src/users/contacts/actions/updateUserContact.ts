import { patchUserContact } from '@farfetch/blackout-client';
import { updateUserContactFactory } from './factories/index.js';

/**
 * Updates a user contact.
 */
export default updateUserContactFactory(patchUserContact);
