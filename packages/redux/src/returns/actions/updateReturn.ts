import { patchReturn } from '@farfetch/blackout-client';
import { updateReturnFactory } from './factories/index.js';

/**
 * Update the pickup schedule of a return.
 */
export default updateReturnFactory(patchReturn);
