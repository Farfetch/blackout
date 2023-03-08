import { createUserPersonalIdFactory } from './factories/index.js';
import { postUserPersonalId } from '@farfetch/blackout-client';

/**
 * Create personal id.
 */
export default createUserPersonalIdFactory(postUserPersonalId);
