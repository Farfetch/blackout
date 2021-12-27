import { deleteUserAttribute } from '@farfetch/blackout-client/users';
import { removeUserAttributeFactory } from './factories';

/**
 * Removes a user attribute with given id.
 *
 * @memberof module:users/actions
 *
 * @function removeUserAttribute
 *
 * @type {RemoveUserAttributeThunkFactory}
 */
export default removeUserAttributeFactory(deleteUserAttribute);
