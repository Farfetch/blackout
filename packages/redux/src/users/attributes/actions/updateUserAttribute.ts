import { patchUserAttribute } from '@farfetch/blackout-client';
import { updateUserAttributeFactory } from './factories/index.js';

/**
 * Updates a user attribute with given id.
 */
export default updateUserAttributeFactory(patchUserAttribute);
