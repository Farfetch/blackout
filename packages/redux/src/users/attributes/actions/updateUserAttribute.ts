import { patchUserAttribute } from '@farfetch/blackout-client';
import { updateUserAttributeFactory } from './factories';

/**
 * Updates a user attribute with given id.
 */
export const updateUserAttribute =
  updateUserAttributeFactory(patchUserAttribute);
