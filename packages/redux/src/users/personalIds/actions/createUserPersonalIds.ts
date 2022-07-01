import { createUserPersonalIdsFactory } from './factories';
import { postUserPersonalId } from '@farfetch/blackout-client';

/**
 * Create personal ids.
 */
export const createUserPersonalId =
  createUserPersonalIdsFactory(postUserPersonalId);
