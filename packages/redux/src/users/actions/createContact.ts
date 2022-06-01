import { createContactFactory } from './factories';
import { postContact } from '@farfetch/blackout-client/users';

/**
 * Creates a user contact.
 */
export default createContactFactory(postContact);
