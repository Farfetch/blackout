import { fetchUserFactory } from './factories';
import { getUser } from '@farfetch/blackout-client/users';

/**
 * Fetch the user data.
 */
export default fetchUserFactory(getUser);
