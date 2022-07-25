import { createUserAttributesFactory } from './factories';
import { postUserAttribute } from '@farfetch/blackout-client';

/**
 * Create user attributes for user with given id.
 */
export default createUserAttributesFactory(postUserAttribute);
