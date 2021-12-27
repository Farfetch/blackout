import { deleteContact } from '@farfetch/blackout-client/users';
import { removeContactFactory } from './factories';

/**
 * Remove a user contact.
 *
 * @memberof module:users/actions
 *
 * @function removeContact
 *
 * @type {RemoveContactThunkFactory}
 */
export default removeContactFactory(deleteContact);
