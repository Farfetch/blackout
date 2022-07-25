import { fetchUserAttributesFactory } from './factories';
import { getUserAttributes } from '@farfetch/blackout-client';

/**
 * Fetch all user attributes with given id.
 */
export default fetchUserAttributesFactory(getUserAttributes);
