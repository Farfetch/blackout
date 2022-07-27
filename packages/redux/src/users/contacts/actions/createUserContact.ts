import { createUserContactFactory } from './factories';
import { postUserContact } from '@farfetch/blackout-client';

/**
 * Creates a user contact.
 */
export default createUserContactFactory(postUserContact);
