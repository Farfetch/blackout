import { fetchReturnReferencesFactory } from './factories';
import { getReturnReferences } from '@farfetch/blackout-client/returns';

/**
 * Fetch a specific return reference.
 */
export const fetchReturnReferences =
  fetchReturnReferencesFactory(getReturnReferences);
