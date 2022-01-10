import { createReturnFactory } from './factories';
import { postReturn } from '@farfetch/blackout-client/returns';

/**
 * Create return.
 *
 * @memberof module:returns/actions
 *
 * @function createReturn
 *
 * @type {CreateReturnThunkFactory}
 */
export default createReturnFactory(postReturn);
