import { createPhoneNumberValidationFactory } from './factories/index.js';
import { postPhoneNumberValidation } from '@farfetch/blackout-client';

/**
 * Validates a phone number without an account.
 */
export default createPhoneNumberValidationFactory(postPhoneNumberValidation);
