import { createUserAttributesFactory } from './factories';
import { postUserAttributes } from '@farfetch/blackout-client/users';

/**
 * Create user attributes for user with given id.
 *
 * @memberof module:users/actions
 *
 * @function createUserAttributes
 *
 * @type {CreateUserAttributesThunkFactory}
 */
export default createUserAttributesFactory(postUserAttributes);
