import { fetchUserAttributeFactory } from './factories';
import { getUserAttribute } from '@farfetch/blackout-client';

/**
 * Fetch all user attribute with given id.
 */
export default fetchUserAttributeFactory(getUserAttribute);
