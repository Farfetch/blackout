import { createReturnFactory } from './factories';
import { postReturn } from '@farfetch/blackout-client/returns';

/**
 * Create return.
 *
 * @memberof module:returns/actions
 *
 * @name createReturn
 *
 * @type {CreateReturnThunkFactory}
 */
export default createReturnFactory(postReturn);
