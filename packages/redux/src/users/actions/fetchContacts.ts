import { fetchContactsFactory } from './factories';
import { getUserContacts } from '@farfetch/blackout-client/users';

/**
 * Fetch all the contacts from user.
 */
export default fetchContactsFactory(getUserContacts);
