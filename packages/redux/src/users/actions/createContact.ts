import { createContactFactory } from './factories';
import { postUserContact } from '@farfetch/blackout-client/users';

/**
 * Creates a user contact.
 */
export default createContactFactory(postUserContact);
