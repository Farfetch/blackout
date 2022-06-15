import { fetchReturnReferencesFactory } from './factories';
import { getReturnReferences } from '@farfetch/blackout-client/returns';

/**
 * Fetch a specific return reference.
 */
export default fetchReturnReferencesFactory(getReturnReferences);