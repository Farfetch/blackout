import { createReturnFactory } from './factories';
import { postReturn } from '@farfetch/blackout-client';

/**
 * Create return.
 */
export default createReturnFactory(postReturn);
