import { fetchReturnFactory } from './factories';
import { getReturn } from '@farfetch/blackout-client/returns';

/**
 * Get return.
 *
 * @memberof module:returns/actions
 *
 * @name getReturn
 *
 * @type {GetReturnThunkFactory}
 */
export default fetchReturnFactory(getReturn);
