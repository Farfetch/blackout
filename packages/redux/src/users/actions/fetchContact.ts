import { fetchContactFactory } from './factories';
import { getUserContact } from '@farfetch/blackout-client/users';

/**
 * Fetch contact from user.
 */
export default fetchContactFactory(getUserContact);
