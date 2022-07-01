import { fetchUserAttributesFactory } from './factories';
import { getUserAttributes } from '@farfetch/blackout-client';

/**
 * Fetch all user attributes with given id.
 */
export const fetchUserAttributes =
  fetchUserAttributesFactory(getUserAttributes);
