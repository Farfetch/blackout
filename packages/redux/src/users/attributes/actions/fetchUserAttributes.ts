import { fetchUserAttributesFactory } from './factories/index.js';
import { getUserAttributes } from '@farfetch/blackout-client';

/**
 * Fetch all user attributes with given id.
 */
export default fetchUserAttributesFactory(getUserAttributes);
