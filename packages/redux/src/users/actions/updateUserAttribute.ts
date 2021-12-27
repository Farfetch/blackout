import { patchUserAttribute } from '@farfetch/blackout-client/users';
import { updateUserAttributeFactory } from './factories';

/**
 * Updates a user attribute with given id.
 *
 * @memberof module:users/actions
 *
 * @function updateUserAttribute
 *
 * @type {UpdateUserAttributeThunkFactory}
 */
export default updateUserAttributeFactory(patchUserAttribute);
