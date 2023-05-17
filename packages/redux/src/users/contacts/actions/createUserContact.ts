import { createUserContactFactory } from './factories/index.js';
import { postUserContact } from '@farfetch/blackout-client';

/**
 * Creates a user contact.
 */
export default createUserContactFactory(postUserContact);
