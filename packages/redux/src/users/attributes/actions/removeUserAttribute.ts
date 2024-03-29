import { deleteUserAttribute } from '@farfetch/blackout-client';
import { removeUserAttributeFactory } from './factories/index.js';

/**
 * Removes a user attribute with given id.
 */
export default removeUserAttributeFactory(deleteUserAttribute);
