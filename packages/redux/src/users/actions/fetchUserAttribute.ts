import { fetchUserAttributeFactory } from './factories';
import { getUserAttribute } from '@farfetch/blackout-client/users';

/**
 * Fetch all user attribute with given id.
 */
export default fetchUserAttributeFactory(getUserAttribute);
