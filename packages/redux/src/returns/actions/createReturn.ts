import { createReturnFactory } from './factories';
import { postReturn } from '@farfetch/blackout-client/returns';

/**
 * Create return.
 */
export default createReturnFactory(postReturn);
