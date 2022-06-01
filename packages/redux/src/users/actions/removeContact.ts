import { deleteContact } from '@farfetch/blackout-client/users';
import { removeContactFactory } from './factories';

/**
 * Remove a user contact.
 */
export default removeContactFactory(deleteContact);
