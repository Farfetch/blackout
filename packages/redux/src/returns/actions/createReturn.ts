import { createReturnFactory } from './factories';
import { postReturn } from '@farfetch/blackout-client/returns';

/**
 * Create return.
 */
export const createReturn = createReturnFactory(postReturn);
