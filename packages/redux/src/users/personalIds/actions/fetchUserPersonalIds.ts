import { fetchUserPersonalIdsFactory } from './factories';
import { getUserPersonalIds } from '@farfetch/blackout-client';

/**
 * Fetch all personal ids.
 */
export const fetchUserPersonalIds =
  fetchUserPersonalIdsFactory(getUserPersonalIds);
