import { createUserAttributesFactory } from './factories';
import { postUserAttributes } from '@farfetch/blackout-client/users';

/**
 * Create user attributes for user with given id.
 */
export default createUserAttributesFactory(postUserAttributes);
