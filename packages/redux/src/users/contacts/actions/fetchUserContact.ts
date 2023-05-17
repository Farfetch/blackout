import { fetchUserContactFactory } from './factories/index.js';
import { getUserContact } from '@farfetch/blackout-client';

/**
 * Fetch contact from user.
 */
export default fetchUserContactFactory(getUserContact);
