import { patchReturn } from '@farfetch/blackout-client/returns';
import { updateReturnFactory } from './factories';

/**
 * Update the pickup schedule of a return.
 *
 * @memberof module:returns/actions
 *
 * @function updateReturn
 *
 * @type {UpdateReturnThunkFactory}
 */
export default updateReturnFactory(patchReturn);
