import { patchUserContact } from '@farfetch/blackout-client';
import { updateUserContactFactory } from './factories';

/**
 * Updates a user contact.
 */
export const updateUserContact = updateUserContactFactory(patchUserContact);
