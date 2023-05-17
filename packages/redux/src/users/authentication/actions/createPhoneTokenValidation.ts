import { createPhoneTokenValidationFactory } from './factories/index.js';
import { postPhoneTokenValidation } from '@farfetch/blackout-client';

/**
 * Validate the user's phone number with a phone token.
 */
export default createPhoneTokenValidationFactory(postPhoneTokenValidation);
