import { createUserPersonalIdFactory } from './factories';
import { postUserPersonalId } from '@farfetch/blackout-client';

/**
 * Create personal id.
 */
export default createUserPersonalIdFactory(postUserPersonalId);
