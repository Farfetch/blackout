import { createContactFactory } from './factories';
import { postContact } from '@farfetch/blackout-client/users';

/**
 * Creates a user contact.
 *
 * @memberof module:users/actions
 *
 * @function createContact
 *
 * @type {CreateContactThunkFactory}
 */
export default createContactFactory(postContact);
