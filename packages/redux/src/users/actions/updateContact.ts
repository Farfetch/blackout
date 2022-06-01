import { patchContact } from '@farfetch/blackout-client/users';
import { updateContactFactory } from './factories';

/**
 * Updates a user contact.
 */
export default updateContactFactory(patchContact);
