import { fetchReferencesFactory } from './factories';
import { getReferences } from '@farfetch/blackout-client/returns';

/**
 * Fetch a specific return reference.
 *
 * @memberof module:returns/actions
 *
 * @function fetchReferences
 *
 * @type {FetchReferencesThunkFactory}
 */
export default fetchReferencesFactory(getReferences);
