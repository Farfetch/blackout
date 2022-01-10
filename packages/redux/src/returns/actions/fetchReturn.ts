import { fetchReturnFactory } from './factories';
import { getReturn } from '@farfetch/blackout-client/returns';

/**
 * Fetch return with given id.
 *
 * @memberof module:returns/actions
 *
 * @function fetchReturn
 *
 * @type {FetchReturnThunkFactory}
 */
export default fetchReturnFactory(getReturn);
