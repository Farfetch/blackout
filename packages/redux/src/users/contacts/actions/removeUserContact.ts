import { deleteUserContact } from '@farfetch/blackout-client';
import { removeUserContactFactory } from './factories';

/**
 * Remove a user contact.
 */
export const removeUserContact = removeUserContactFactory(deleteUserContact);
