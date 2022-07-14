import { deleteUserPersonalId } from '@farfetch/blackout-client';
import { removeUserPersonalIdFactory } from './factories';

/**
 * Removes a personal id.
 */
export const removeUserPersonalId =
  removeUserPersonalIdFactory(deleteUserPersonalId);
