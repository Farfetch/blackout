import { createReturnFactory } from './factories/index.js';
import { postReturn } from '@farfetch/blackout-client';

/**
 * Create return.
 */
export default createReturnFactory(postReturn);
