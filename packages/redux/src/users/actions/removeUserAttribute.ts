import { deleteUserAttribute } from '@farfetch/blackout-client/users';
import { removeUserAttributeFactory } from './factories';

/**
 * Removes a user attribute with given id.
 */
export default removeUserAttributeFactory(deleteUserAttribute);
