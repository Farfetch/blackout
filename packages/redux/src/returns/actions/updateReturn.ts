import { patchReturn } from '@farfetch/blackout-client';
import { updateReturnFactory } from './factories';

/**
 * Update the pickup schedule of a return.
 */
export default updateReturnFactory(patchReturn);
