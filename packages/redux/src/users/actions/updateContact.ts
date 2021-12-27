import { patchContact } from '@farfetch/blackout-client/users';
import { updateContactFactory } from './factories';

/**
 * Updates a user contact.
 *
 * @memberof module:users/actions
 *
 * @function updateContact
 *
 * @type {UpdateContactThunkFactory}
 */
export default updateContactFactory(patchContact);
