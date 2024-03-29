import { createPhoneTokenFactory } from './factories/index.js';
import { postPhoneToken } from '@farfetch/blackout-client';

/**
 * Sends a phone token to the specified phone number.
 */
export default createPhoneTokenFactory(postPhoneToken);
