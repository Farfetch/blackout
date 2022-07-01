import { fetchUserContactFactory } from './factories';
import { getUserContact } from '@farfetch/blackout-client';

/**
 * Fetch contact from user.
 */
export const fetchUserContact = fetchUserContactFactory(getUserContact);
