import { fetchUserPersonalIdFactory } from './factories';
import { getUserPersonalId } from '@farfetch/blackout-client';

/**
 * Fetch a specific personal id.
 */
export const fetchUserPersonalId =
  fetchUserPersonalIdFactory(getUserPersonalId);
