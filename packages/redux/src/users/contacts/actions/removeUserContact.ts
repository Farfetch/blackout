import { deleteUserContact } from '@farfetch/blackout-client';
import { removeUserContactFactory } from './factories/index.js';

/**
 * Remove a user contact.
 */
export default removeUserContactFactory(deleteUserContact);
