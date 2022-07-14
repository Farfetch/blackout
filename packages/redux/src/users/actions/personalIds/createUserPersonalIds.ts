import { createUserPersonalIdsFactory } from './factories';
import { postUserPersonalIds } from '@farfetch/blackout-client';

/**
 * Create personal ids.
 */
export const createUserPersonalIds =
  createUserPersonalIdsFactory(postUserPersonalIds);
