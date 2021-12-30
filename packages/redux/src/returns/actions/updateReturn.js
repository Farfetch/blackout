import { patchReturn } from '@farfetch/blackout-client/returns';
import { updateReturnFactory } from './factories';

/**
 * Patch return.
 *
 * @memberof module:returns/actions
 *
 * @name patchReturn
 *
 * @type {PatchReturnThunkFactory}
 */
export default updateReturnFactory(patchReturn);
