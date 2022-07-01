import { deleteUserAttribute } from '@farfetch/blackout-client';
import { removeUserAttributeFactory } from './factories';

/**
 * Removes a user attribute with given id.
 */
export const removeUserAttribute =
  removeUserAttributeFactory(deleteUserAttribute);
