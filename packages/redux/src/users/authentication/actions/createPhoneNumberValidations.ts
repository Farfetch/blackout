import { createPhoneNumberValidationsFactory } from './factories';
import { postPhoneNumberValidation } from '@farfetch/blackout-client';

/**
 * Validates a phone number without an account.
 */
export default createPhoneNumberValidationsFactory(postPhoneNumberValidation);
