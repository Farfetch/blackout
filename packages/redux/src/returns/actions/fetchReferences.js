import { fetchReferencesFactory } from './factories';
import { getReferences } from '@farfetch/blackout-client/returns';

/**
 * Get pickup capabilities.
 *
 * @memberof module:returns/actions
 *
 * @name getReferences
 *
 * @type {GetReferencesThunkFactory}
 */
export default fetchReferencesFactory(getReferences);
