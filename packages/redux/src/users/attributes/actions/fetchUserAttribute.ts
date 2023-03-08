import { fetchUserAttributeFactory } from './factories/index.js';
import { getUserAttribute } from '@farfetch/blackout-client';

/**
 * Fetch all user attribute with given id.
 */
export default fetchUserAttributeFactory(getUserAttribute);
