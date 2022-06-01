import { fetchReferencesFactory } from './factories';
import { getReferences } from '@farfetch/blackout-client/returns';

/**
 * Fetch a specific return reference.
 */
export default fetchReferencesFactory(getReferences);
