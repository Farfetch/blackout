import { fetchContactFactory } from './factories';
import { getContact } from '@farfetch/blackout-client/users';

/**
 * Fetch contact from user.
 */
export default fetchContactFactory(getContact);
