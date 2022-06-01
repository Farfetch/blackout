import { fetchContactsFactory } from './factories';
import { getContacts } from '@farfetch/blackout-client/users';

/**
 * Fetch all the contacts from user.
 */
export default fetchContactsFactory(getContacts);
