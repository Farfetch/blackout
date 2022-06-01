import { fetchUserAttributesFactory } from './factories';
import { getUserAttributes } from '@farfetch/blackout-client/users';

/**
 * Fetch all user attributes with given id.
 */
export default fetchUserAttributesFactory(getUserAttributes);
