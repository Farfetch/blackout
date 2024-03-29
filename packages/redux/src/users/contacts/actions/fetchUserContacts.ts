import { fetchUserContactsFactory } from './factories/index.js';
import { getUserContacts } from '@farfetch/blackout-client';

/**
 * Fetch all the contacts from user.
 */
export default fetchUserContactsFactory(getUserContacts);
